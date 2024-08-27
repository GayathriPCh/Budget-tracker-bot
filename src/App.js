import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import './styles/App.css';
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">PennyWise</h1>
        <p className="app-description">
          Your intelligent assistant for managing and tracking your expenses with ease. Chat with the bot, add your expenses, and keep track effortlessly.
        </p>
      </header>
      {user ? (
        <>
          <ExpenseForm />
          <ExpenseList />
          <Chat />
          <button className="sign-out-button" onClick={() => auth.signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <SignUp />
          <SignIn />
        </>
      )}
    </div>
  );
};
export default App;
