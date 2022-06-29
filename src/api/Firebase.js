import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  set,
  ref as refDatabase,
  update,
  get,
  child,
  push,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SOTRAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const writeNewPost = (
  username,
  userId,
  image,
  description,
  creatorPic
) => {
  const db = getDatabase();
  const newPostKey = push(child(refDatabase(db), "posts")).key;
  const postData = {
    postId: newPostKey,
    username,
    userId,
    image,
    description,
    creatorPic,
    createdTime: Date.now(),
  };
  const updates = {};
  updates["/posts/" + newPostKey] = postData;
  updates["/user-posts/" + userId + "/" + newPostKey] = postData;
  update(refDatabase(db), updates);
  return postData;
};

export const setData = async (id, endpoint, body) => {
  const db = getDatabase();
  await set(refDatabase(db, `${endpoint}/${id}`), body);
};

export const getData = async endpoint => {
  const dbRef = refDatabase(getDatabase());
  const response = await get(child(dbRef, endpoint));
  return response;
};

export const updateData = async updates => {
  const db = getDatabase();
  update(refDatabase(db), updates);
};
