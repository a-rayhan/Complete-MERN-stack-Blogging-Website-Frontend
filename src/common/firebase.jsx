import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjzs9YgBHhF1hwEoodwrqbB1QuHxSHOh0",
    authDomain: "event-flow-d8d7f.firebaseapp.com",
    projectId: "event-flow-d8d7f",
    storageBucket: "event-flow-d8d7f.appspot.com",
    messagingSenderId: "1061993939386",
    appId: "1:1061993939386:web:765b236e8e9286a2705d83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user
        })
        .catch((err) => {
            console.log(err);
        })

    return user;

}