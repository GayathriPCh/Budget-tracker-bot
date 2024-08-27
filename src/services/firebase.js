import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyD9C8KJue4H4uiq7v__h-zGd-CsIbkjQpo",
  authDomain: "financebot-41f53.firebaseapp.com",
  projectId: "financebot-41f53",
  storageBucket: "financebot-41f53.appspot.com",
  messagingSenderId: "874233074053",
  appId: "1:874233074053:web:75c3ca659f0ac3225cf4ec",
  measurementId: "G-MC8M75T54T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);
async function updateExpenses() {
    const expensesRef = collection(db, 'expenses');
    const querySnapshot = await getDocs(expensesRef);
  
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, 'expenses', document.id);
      await updateDoc(docRef, { userId: 'default-user-id' });  // Update with the appropriate user ID or logic
    });
  }
  
  updateExpenses().catch(console.error);
export { db };
