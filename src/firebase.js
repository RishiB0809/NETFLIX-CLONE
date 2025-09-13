import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBdpa72gef6X4V6bqWBo78uc9FZ5A-Uq_o",
  authDomain: "netflix-clone-cf240.firebaseapp.com",
  projectId: "netflix-clone-cf240",
  storageBucket: "netflix-clone-cf240.firebasestorage.app",
  messagingSenderId: "44472033697",
  appId: "1:44472033697:web:0987940616b802f7a8abe0",
  measurementId: "G-KQDJ719ZNE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try {
     const res = await createUserWithEmailAndPassword(auth, email, password);
     const user = res.user; 
     await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
     });
    } catch (error) {
        console.log(error);
        alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, signup, login, logout};