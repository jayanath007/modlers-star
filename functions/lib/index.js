"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const fs = require("fs");
const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const exec = require('child_process').exec;
const vision = require('@google-cloud/vision').v1p1beta1;
const client = new vision.ImageAnnotatorClient();
const storage = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
admin.initializeApp(functions.config().firebase);
exports.likeRatingCalculation = functions.database.ref('/likes/{likesId}')
    .onWrite((change, context) => {
    // Only edit data when it is first created.
    console.log('like Rating Calculation get start');
    if (change.before.exists()) {
        console.log('Only edit data when it is first created');
        return null;
    }
    // Exit when the data is deleted.
    if (!change.after.exists()) {
        console.log('Exit when the data is deleted');
        return null;
    }
    // Grab the current value of what was written to the Realtime Database.
    const original = change.after.val();
    console.log('Uppercasing', context.params.pushId, original);
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return updateRating(original.albumId, 5);
});
exports.onFinalize = functions.storage.object().onFinalize((object) => {
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log(object);
    if (object.resourceState === 'not_exists') {
        console.log('We deleted a file, exit...');
        return null;
    }
    if (filePath.startsWith('resized')) {
        console.log('We already renamed that file!');
        return null;
    }
    const destBucket = storage.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert', [tmpFilePath, '-resize', '200x200^', '-gravity', 'center', '-extent', '200x200', tmpFilePath]);
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'resized/' + path.basename(filePath),
            metadata: metadata
        });
    });
});
exports.aggregateComments = functions.firestore
    .document('albums/{postId}/comments/{commentId}')
    .onWrite((event) => {
    const commentId = event.params.commentId;
    const postId = event.params.postId;
    const docRef = admin.firestore().collection('albums').doc(postId);
    return docRef.collection('comments').orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
        const commentCount = querySnapshot.size;
        const recentComments = [];
        querySnapshot.forEach(doc => {
            recentComments.push(doc.data());
        });
        recentComments.splice(5);
        const lastActivity = recentComments[0].createdAt;
        const data = { commentCount, recentComments, lastActivity };
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
exports.aggregatePhotoComments = functions.firestore
    .document('albums/{albumId}/photoComments/{photoCommentId}/comments/{commentId}')
    .onWrite((event) => {
    const albumId = event.params.albumId;
    const photoCommentId = event.params.photoCommentId;
    const commentId = event.params.commentId;
    const docRef = admin.firestore().collection('albums').doc(albumId)
        .collection('photoComments').doc(photoCommentId);
    return docRef.collection('comments').orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
        const commentCount = querySnapshot.size;
        const recentComments = [];
        querySnapshot.forEach(doc => {
            recentComments.push(doc.data());
        });
        recentComments.splice(5);
        const lastActivity = recentComments[0].createdAt;
        const data = { commentCount, recentComments, lastActivity };
        admin.firestore().collection('albums').doc(albumId).update({ lastActivity });
        return docRef.set(data);
    })
        .catch(err => console.log(err));
});
function updateRating(albumId, newValue) {
    const albumRef = admin.firestore().collection('albums').doc(albumId);
    console.log('update start');
    return albumRef.get().then((album) => {
        if (album) {
            let rating = newValue;
            if (album.rating) {
                rating = album.rating + newValue;
            }
            albumRef.set({ rating: rating });
            updateUserRating(album, newValue);
            Object.keys(album.tag).forEach((key) => {
                album.tag[key] = newValue;
                updateTagRating(album.tag[key], newValue);
            });
            console.log('album rate update', album);
        }
        return albumRef.update(album);
    }).catch(err => console.log(err));
}
function updateUserRating(userId, newValue) {
    const userRef = admin.firestore().collection('users').doc(userId);
    return userRef.get().then((user) => {
        if (user) {
            let rating = newValue;
            if (user.rating) {
                rating = user.rating + newValue;
            }
            userRef.set({ rating: rating });
        }
        console.log('user rate update', user);
        return userRef.update(user);
    }).catch(err => console.log(err));
}
function updateTagRating(tagId, newValue) {
    const tagRef = admin.firestore().collection('tags').doc(tagId);
    return tagRef.get().then((tag) => {
        if (tag) {
            let rating = newValue;
            if (tag.rating) {
                rating = tag.rating + newValue;
            }
            tagRef.set({ rating: rating });
        }
        console.log('tag rate update', tag);
        return tagRef.update(tag);
    }).catch(err => console.log(err));
}
exports.blurOffensiveImages = (event) => {
    const object = event.data;
    if (object.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return null;
    }
    else if (!object.name) {
        console.log('This is a deploy event.');
        return null;
    }
    const file = storage.bucket(object.bucket).file(object.name);
    const filePath = `gs://${object.bucket}/${object.name}`;
    console.log(`Analyzing ${file.name}.`);
    return client.safeSearchDetection(filePath)
        .catch((err) => {
        console.error(`Failed to analyze ${file.name}.`, err);
        return Promise.reject(err);
    })
        .then(([result]) => {
        const detections = result.safeSearchAnnotation;
        if (detections.adult === 'VERY_LIKELY' ||
            detections.violence === 'VERY_LIKELY') {
            console.log(`The image ${file.name} has been detected as inappropriate.`);
            return blurImage(file);
        }
        else {
            console.log(`The image ${file.name} has been detected as OK.`);
        }
    });
};
function blurImage(file) {
    const tempLocalFilename = `/tmp/${path.parse(file.name).base}`;
    return file.download({ destination: tempLocalFilename })
        .catch((err) => {
        console.error('Failed to download file.', err);
        return Promise.reject(err);
    })
        .then(() => {
        console.log(`Image ${file.name} has been downloaded to ${tempLocalFilename}.`);
        return new Promise((resolve, reject) => {
            exec(`convert ${tempLocalFilename} -channel RGBA -blur 0x24 ${tempLocalFilename}`, { stdio: 'ignore' }, (err, stdout) => {
                if (err) {
                    console.error('Failed to blur image.', err);
                    reject(err);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    })
        .then(() => {
        console.log(`Image ${file.name} has been blurred.`);
        return file.bucket.upload(tempLocalFilename, { destination: file.name })
            .catch((err) => {
            console.error('Failed to upload blurred image.', err);
            return Promise.reject(err);
        });
    })
        .then(() => {
        console.log(`Blurred image has been uploaded to ${file.name}.`);
        return new Promise((resolve, reject) => {
            fs.unlink(tempLocalFilename, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
//# sourceMappingURL=index.js.map