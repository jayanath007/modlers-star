

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const exec = require('child_process').exec;
const fs = require('fs');
const vision = require('@google-cloud/vision').v1p1beta1;
const client = new vision.ImageAnnotatorClient();


const storage = require('@google-cloud/storage')();
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;



admin.initializeApp(functions.config().firebase);

exports.onFileChange= functions.storage.object().onChange(event => {
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
        return spawn('convert', [tmpFilePath,'-resize','200x200^',"\"", '-gravity','center','-extent', '200x200', tmpFilePath]);
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'resized/' + path.basename(filePath),
            metadata: metadata
        })
    });
});


// -resize 64x64^ \
//           -gravity center -extent 64x64







exports.aggregateComments = functions.firestore
    .document('albums/{postId}/comments/{commentId}')
    .onWrite(event => {

        const commentId = event.params.commentId;
        const postId = event.params.postId;

        // ref to the parent document
        const docRef = admin.firestore().collection('albums').doc(postId);

        // get all comments and aggregate
        return docRef.collection('comments').orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {

                // get the total comment count
                const commentCount = querySnapshot.size

                const recentComments = []

                // add data from the 5 most recent comments to the array
                querySnapshot.forEach(doc => {
                    recentComments.push(doc.data())
                });

                recentComments.splice(5)

                // record last comment timestamp
                const lastActivity = recentComments[0].createdAt

                // data to update on the document
                const data = { commentCount, recentComments, lastActivity }

                // run update
                return docRef.update(data)
            })
            .catch(err => console.log(err))
    });


exports.aggregatePhotoComments = functions.firestore
    .document('albums/{albumId}/photoComments/{photoCommentId}/comments/{commentId}')
    .onWrite(event => {


        const albumId = event.params.albumId;
        const photoCommentId = event.params.photoCommentId;
        const commentId = event.params.commentId;

        // ref to the parent document
        const docRef = admin.firestore().collection('albums').doc(albumId)
            .collection('photoComments').doc(photoCommentId);

        // get all comments and aggregate
        return docRef.collection('comments').orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {

                // get the total comment count
                const commentCount = querySnapshot.size

                const recentComments = []

                // add data from the 5 most recent comments to the array
                querySnapshot.forEach(doc => {
                    recentComments.push(doc.data())
                });

                recentComments.splice(5)

                // record last comment timestamp
                const lastActivity = recentComments[0].createdAt

                // data to update on the document
                const data = { commentCount, recentComments, lastActivity }
                admin.firestore().collection('albums').doc(albumId).update({ lastActivity });

                return docRef.set(data)

            })
            .catch(err => console.log(err))
    });



exports.aggregateLike = functions.firestore
    .document('likes/{likesId}')
    .onUpdate(event => {

        console.log(event);
        console.log(event.data);
        console.log(event.data.val());

        const likesId = event.params.likesId;
        const like = event.data.val();
        const albumRef = admin.firestore().collection('albums').doc(like.albumId);

        return albumRef.get((album) => {
           
            if (album) {
                const rateValue = like.value;
                if (album.rateValue) {
                    rateValue = album.rateValue + rateValue;
                }
                albumRef.set({ rateValue: rateValue });
             
            }
            console.log('rateValue', album);
            return albumRef.update(data)

        }).catch(err => console.log(err));

    });




    


  




// Blurs uploaded images that are flagged as Adult or Violence.
exports.blurOffensiveImages = (event) => {
    const object = event.data;
  
    // Exit if this is a deletion or a deploy event.
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



    // Blurs the given file using ImageMagick.
function blurImage (file) {
    const tempLocalFilename = `/tmp/${path.parse(file.name).base}`;
  
    // Download file from bucket.
    return file.download({ destination: tempLocalFilename })
      .catch((err) => {
        console.error('Failed to download file.', err);
        return Promise.reject(err);
      })
      .then(() => {
        console.log(`Image ${file.name} has been downloaded to ${tempLocalFilename}.`);
  
        // Blur the image using ImageMagick.
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
  
        // Upload the Blurred image back into the bucket.
        return file.bucket.upload(tempLocalFilename, { destination: file.name })
          .catch((err) => {
            console.error('Failed to upload blurred image.', err);
            return Promise.reject(err);
          });
      })
      .then(() => {
        console.log(`Blurred image has been uploaded to ${file.name}.`);
  
        // Delete the temporary file.
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