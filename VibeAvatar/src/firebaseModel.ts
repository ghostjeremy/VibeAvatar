import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig"
import { getDatabase, ref, set, get } from "firebase/database"
import { getStorage, ref as storageref, uploadString } from 'firebase/storage'

const app = initializeApp(firebaseConfig);
const fireStoreDB = getFirestore(app);

interface FavouriteImage {
  url: string;
  playlistName: string;
  time: string;
}

async function getApiKey(api: string) {
    const docRef = doc(fireStoreDB, "apiKeys", api);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log("API Key Retrieved: ", api);
        // console.log(docSnap.data().key)
        return docSnap.data().key
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
}

async function getApiSecret(api: string) {
  const docRef = doc(fireStoreDB, "apiKeys", api);
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
      console.log("API secret Retrieved: ", api);
      // console.log(docSnap.data().key)
      return docSnap.data().secret
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
}

// upload favourite image to firebase storage
const storage = getStorage(app)

async function uploadImageToFirebase(base64Image: string): Promise<string> {
  try {
    const remoteImagePath = `images/${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`
    const storageRef = storageref(storage, remoteImagePath);
    await uploadString(storageRef, base64Image, 'data_url');

    console.log('Image uploaded to Firebase Storage.');

    const firebaseImageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${encodeURIComponent(remoteImagePath)}?alt=media`;

    return firebaseImageUrl;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


const db = getDatabase(app);

const refFavourites = (uid?: string) =>
  ref(db, 'users/' + uid + '/favourites/')

async function getFavourites(userId: string): Promise< FavouriteImage[] | null> {
  try {
    const snapshot = await get(refFavourites(userId))
    if (snapshot.exists()) {
      const favourites = snapshot.val()
      console.log('getting favourites: ', favourites)
      return favourites
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user favorite images:', error);
    return null;
  }
}

async function saveFavourites(userId: string, favourites: FavouriteImage[]) {
  try {
    await set(refFavourites(userId), favourites);
    console.log('Favourites saved successfully:', favourites);
  } catch (error) {
    console.error('Error saving user favourites:', error);
    throw error;
  }
}

export { getApiKey, getApiSecret, getFavourites, saveFavourites, uploadImageToFirebase }