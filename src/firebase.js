import { initializeApp } from "firebase/app";
import {getFirestore, query, collection, onSnapshot, doc, addDoc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Get All
const getAll = (_collection) => {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, _collection));
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      resolve(data);
    }, reject);
  });
};

//Get by ID
const getById = async (_collection, id) => {
  try {
    const docRef = doc(db, _collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching document by ID:', error);
    throw error;
  }
};


// Add Item
const addItem = async (_collection, obj) => {
  try {
    const docRef = await addDoc(collection(db, _collection), obj);
    return docRef;

  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};


// Update Item
const updateItem = async (_collection, id, _obj) => {
  try {
    const obj = _obj;
    await updateDoc(doc(db, _collection, id), obj);
  } catch (error) {

    console.error('Error updating item:', error);
    throw error;
  }
};

//Delete Item
const deleteItem = async (_collection, id) => {
  try {
    await deleteDoc(doc(db, _collection, id));
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

//Reset All State
const resetState = async (dispatch, dispatchFunc, _collection) => {
  try {
    const data = await getAll(_collection);
    dispatch(dispatchFunc(data));
    console.log('resetState: ', _collection, data);
  } catch (error) {
    console.error(`Error fetching ${_collection}:`, error);
  }
};


export {db, getAll, addItem, getById, updateItem, deleteItem, resetState}