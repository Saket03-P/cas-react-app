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