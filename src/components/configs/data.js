import { db } from './firebase'

export const addPost= async (postData) => {
    try {
        const { content, image, likes, comments, timestamp }= postData

        const docRef= await db.collection('posts').add({
            content: content, 
            image: image, 
            likes: likes, 
            comments: comments, 
            timestamp: timestamp
        })

        console.log('Post Added Successfully with id: ', docRef.id)
        return docRef.id
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getPosts= async () => {
    try {
        const snapshot= await db.collection('posts').get()
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    } catch (error) {
        console.log(error)
        return []
    }
}

export const updateLikes = async (postId, likes) => {
    try {
      await db.collection('posts').doc(postId).update({ likes });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  export const addComment = async (postId, userEmail, commentContent) => {
    try {
      // Fetch the post document from Firestore
      const postRef = db.collection('posts').doc(postId);
      const doc = await postRef.get();
   
      if (doc.exists) {
        // Get the current comments array from the document
        const currentComments = doc.data().comments || [];
   
        // Add the new comment object with email and content to the comments array
        const newComment = { userEmail, content: commentContent };
        const updatedComments = [...currentComments, newComment];
   
        // Update the comments array in the Firestore document
        await postRef.update({ comments: updatedComments });
   
        console.log('Comment added successfully');
        return updatedComments; // Return the updated comments array
      } else {
        console.error('No such document found');
        return [];
      }
    } catch (error) {
      console.error('Error adding comment: ', error);
      throw error;
    }
  };

//   export const addComment = async (postId, newComment) => {
//     try {
//       // Fetch the post document from Firestore
//       const postRef = db.collection('posts').doc(postId);
//       const doc = await postRef.get();
  
//       if (doc.exists) {
//         // Update the comments array in the document
//         const updatedComments = [...doc.data().comments, newComment];
//         await postRef.update({ comments: updatedComments });
  
//         console.log('Comment added successfully');
//         return updatedComments; // Return the updated comments array
//       } else {
//         console.error('No such document found');
//         return [];
//       }
//     } catch (error) {
//       console.error('Error adding comment: ', error);
//       throw error;
//     }
//   };