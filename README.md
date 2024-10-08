# Budget Tracker Bot

## Overview

**Budget Tracker Bot** is a web application that helps users manage and track their expenses effortlessly. It features an intelligent chatbot that assists with expense management, a form to add expenses, and a list to view and categorize expenses. The app integrates Firebase for authentication and Firestore for data storage.

## Features

- **User Authentication**: Sign up, sign in, and sign out functionality using Firebase Authentication.
- **Expense Management**: Add and categorize expenses with an integrated form.
- **Expense Tracking**: View a list of expenses sorted by date.
- **Chatbot Integration**: Interact with a chatbot to get responses related to expenses.
- **Custom Fonts and Styling**: Enhanced UI with custom fonts and stylish design.

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Firebase**: Backend services including Authentication and Firestore database.
- **Firestore**: NoSQL cloud database for storing expenses.
- **Custom Fonts**: Integrates custom fonts for a unique look and feel.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/GayathriPCh/budget-tracker-bot.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd budget-tracker-bot
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

4. **Configure Firebase**:

    - Create a Firebase project and add Firebase configuration to `src/services/firebase.js`.

5. **Add Custom Fonts**:

    - Place your `.ttf` font files in the `public/fonts/` directory.

6. **Run the Application**:

    ```bash
    npm start
    ```

7. **Open the Application**:

    Open your browser and go to `http://localhost:3000` to see the application in action.

## Directory Structure

```
src/
│
├── components/
│   ├── Chat.js
│   ├── ExpenseForm.js
│   ├── ExpenseList.js
│   ├── SignIn.js
│   └── SignUp.js
│
├── services/
│   ├── firebase.js
│   └── groqApi.js
│
├── styles/
│   └── App.css
│
├── App.js
└── index.js
```

