

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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
                admin.firestore().collection('albums').doc(albumId).update( { lastActivity });

                return docRef.set(data)

            })
            .catch(err => console.log(err))
    });