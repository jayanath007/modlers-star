
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as functions from 'firebase-functions';
import * as os from 'os';
import * as path from 'path';

const exec = require('child_process').exec;
const vision = require('@google-cloud/vision').v1p1beta1;
const client = new vision.ImageAnnotatorClient();
const storage = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;



export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


admin.initializeApp(functions.config().firebase);

exports.onFileChange = functions.storage.object().onFinalize((event: any) => {
    const object = event.data;
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('File change detected, function execution started');

    if (object.resourceState === 'not_exists') {
        console.log('We deleted a file, exit...');
        return;
    }

    if (path.basename(filePath).startsWith('resized-')) {
        console.log('We already renamed that file!');
        return;
    }

    const destBucket = storage.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };

    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert',
            [tmpFilePath, '-resize', '200x200^', '-gravity', 'center', '-extent', '200x200', tmpFilePath]);
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'resized/resized-' + path.basename(filePath),
            metadata: metadata
        })
    });
});



exports.aggregateComments = functions.firestore
    .document('albums/{postId}/comments/{commentId}')
    .onWrite((event: any) => {

        const commentId = event.params.commentId;
        const postId = event.params.postId;

        const docRef = admin.firestore().collection('albums').doc(postId);

        return docRef.collection('comments').orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {

                const commentCount = querySnapshot.size
                const recentComments = []
                querySnapshot.forEach(doc => {
                    recentComments.push(doc.data())
                });
                recentComments.splice(5)
                const lastActivity = recentComments[0].createdAt;
                const data = { commentCount, recentComments, lastActivity };

                return docRef.update(data)
            })
            .catch(err => console.log(err))
    });


exports.aggregatePhotoComments = functions.firestore
    .document('albums/{albumId}/photoComments/{photoCommentId}/comments/{commentId}')
    .onWrite((event: any) => {


        const albumId = event.params.albumId;
        const photoCommentId = event.params.photoCommentId;
        const commentId = event.params.commentId;

        const docRef = admin.firestore().collection('albums').doc(albumId)
            .collection('photoComments').doc(photoCommentId);

        return docRef.collection('comments').orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {

                const commentCount = querySnapshot.size
                const recentComments = []
                querySnapshot.forEach(doc => {
                    recentComments.push(doc.data())
                });
                recentComments.splice(5)
                const lastActivity = recentComments[0].createdAt
                const data = { commentCount, recentComments, lastActivity }
                admin.firestore().collection('albums').doc(albumId).update({ lastActivity });
                return docRef.set(data)

            })
            .catch(err => console.log(err))
    });



exports.aggregateLike = functions.firestore
    .document('likes/{likesId}')
    .onUpdate((event: any) => {

        const likesId = event.params.likesId;
        const like = event.data.val();
        const albumRef = admin.firestore().collection('albums').doc(like.albumId);

        return albumRef.get().then((album: any) => {

            if (album) {
                let rateValue = like.value;
                if (album.rateValue) {
                    rateValue = album.rateValue + rateValue;
                }
                albumRef.set({ rateValue: rateValue });

            }
            console.log('rateValue', album);
            return albumRef.update(album)

        }).catch(err => console.log(err));

    });



function updateRating(albumId, newValue) {

    const albumRef = admin.firestore().collection('albums').doc(albumId);

    return albumRef.get().then((album: any) => {
        if (album) {
            let rating = newValue;
            if (album.rating) {
                rating = album.rating + newValue;
            }
            albumRef.set({ rating: rating });

            updateUserRating(album, newValue);

            Object.keys(album.tag).forEach((key) => {
                album.tag[key]
                updateTagRating(album, newValue);
            });


            console.log('album rate update', album);
        }
        return albumRef.update(album)
    }).catch(err => console.log(err));


}


function updateUserRating(userId, newValue) {

    const userRef = admin.firestore().collection('users').doc(userId);
    return userRef.get().then((user: any) => {

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
    return tagRef.get().then((tag: any) => {

        if (tag) {
            let rating = newValue;
            if (tag.rating) {
                rating = tag.rating + newValue;
            }
            tagRef.set({ rating: rating });
        }
        console.log('tag rate update', tag);
        return tagRef.update(tag)
    }).catch(err => console.log(err));

}





exports.blurOffensiveImages = (event) => {
    const object = event.data;

    if (object.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    } else if (!object.name) {
        console.log('This is a deploy event.');
        return;
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
            } else {
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
                    } else {
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
                    } else {
                        resolve();
                    }
                });
            });
        });
}