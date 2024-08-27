import Groq from 'groq-sdk';
import { db, auth } from './firebase'; // Import Firestore configuration and auth object
import { collection, getDocs, query, where } from 'firebase/firestore';

// Initialize Groq API with your API key
const groq = new Groq({ apiKey: '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', dangerouslyAllowBrowser: true });

// Function to categorize expenses
export async function categorizeExpense(description) {
  const fullPrompt = `
  This is currently 2024. Your task is to categorize the following expense description accurately. Provide only the category, nothing else.
  Description: ${description}
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
      model: 'llama3-8b-8192',  // Replace with the appropriate model name if needed
      temperature: 0.5,
      max_tokens: 50,
      top_p: 1,
      stream: false,
      stop: null,
    });

    // Assuming the response has a `text` field with the category
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error categorizing expense:", error);
    return "uncategorized";
  }
}

// Function to handle user queries about expenses
export async function getBotResponse(userPrompt) {
    const user = auth.currentUser;
    if (!user) {
      return "Please sign in to access your data.";
    }
  
    // Filter expenses by user ID
    const expensesQuery = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid)
    );
    
    const expensesSnapshot = await getDocs(expensesQuery);
    const expenses = expensesSnapshot.docs.map(doc => doc.data());
  
    const expensesText = expenses.map(exp => `${exp.date.toDate().toLocaleDateString()}: $${exp.amount} on ${exp.description} (${exp.category})`).join('\n');
    
    const fullPrompt = `
    You have access to the following expense records:
    ${expensesText}
    
    User Query: ${userPrompt}
    
    Your task is to answer the user's query based on this data. Just answer directly to user.But be friendly, be creative if they ask for any advice, say hi if they say hi. you are their budget tracker buddy remember.
    `;
  
    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
        model: 'llama3-8b-8192',
        temperature: 0.5,
        max_tokens: 150,
        top_p: 1,
        stream: false,
        stop: null,
      });
  
      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error getting bot response:", error);
      return "Sorry, I couldn't process your request.";
    }
  }