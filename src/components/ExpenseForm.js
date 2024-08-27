import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { categorizeExpense } from "../services/groqApi";
import { auth } from "../services/firebase";
import "../styles/ExpenseForm.css";
const ExpenseForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = await categorizeExpense(description);

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "expenses"), {
          description,
          amount: parseFloat(amount),
          category,
          date: serverTimestamp(),
          userId: user.uid, // Add user ID to the expense
        });
        setDescription("");
        setAmount("");
      } else {
        console.error("No user signed in");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
