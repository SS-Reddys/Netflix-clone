import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAllIwDselLpLwHI8mhPPtgA2cqn4fzWv0",
  authDomain: "netflix-clone-bdc04.firebaseapp.com",
  projectId: "netflix-clone-bdc04",
  storageBucket: "netflix-clone-bdc04.appspot.com",
  messagingSenderId: "376662652025",
  appId: "1:376662652025:web:aee2274bbb7250aee110a8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = ()=>{
    // signOut(auth);
    signOut(auth);
}

export {auth, db, login, signup, logout};