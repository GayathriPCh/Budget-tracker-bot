import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth } from "../services/firebase";
import '../styles/ExpenseList.css';
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(""); // For error handling

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", user.uid), // Filter by user ID
        orderBy("date", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const expensesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setExpenses(expensesData);
          setLoading(false); // Set loading to false once data is fetched
        },
        (error) => {
          console.error("Error fetching expenses:", error);
          setError("Failed to load expenses."); // Set error message if there's an issue
          setLoading(false); // Set loading to false in case of error
        }
      );

      return () => unsubscribe(); // Cleanup on unmount
    } else {
      setError("No user is signed in.");
      setLoading(false); // Set loading to false if no user is signed in
    }
  }, []); // Dependency array should be empty to run only on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.description}: ${expense.amount} ({expense.category})
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
