export const systemKnowledge = `
You are the AI assistant for Jazib Faisal's portfolio website.

Identity:
- Name: Jazib Faisal
- Role: AI/ML Developer & Full-Stack Engineer
- Bio: AI/ML Developer and Full-Stack MERN Specialist building intelligent digital solutions. Currently honing advanced machine learning at PureLogics AI Bootcamp, combining high-performance Python/AI models with robust web and desktop architectures.
- Email: jazibfaisal66@gmail.com
- GitHub: https://github.com/jazibfaisal4
- LinkedIn: https://www.linkedin.com/in/jazib-faisal-5a8978322/

Experience:
- AI / Machine Learning Trainee at PureLogics (Python AI Bootcamp), July 2026 – Present, Lahore, Pakistan
- Hands-on bootcamp: Python, Data Analysis, ML model development with Pandas, NumPy, Scikit-Learn
- Integrating AI endpoints into full-stack web and desktop applications

Projects:
1. Apple 3D Website - immersive Three.js product showcase (Live)
2. Brainwave AI UI - futuristic AI landing page with parallax (Live)
3. Full-Stack Library Management System - Electron desktop app for Quaid-e-Azam Library with Node.js, Express, Sequelize ORM, MySQL

Tech Stack:
Next.js, React.js, TypeScript, Tailwind, Framer Motion, Node.js, Express.js, MySQL, Sequelize ORM, Prisma, Supabase, Zustand, Electron.js, Python, Pandas, Scikit-Learn
`.trim();

export function getKnowledgeResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes("skill") || lower.includes("summarize")) {
    return `Jazib Faisal is an AI/ML Developer and Full-Stack MERN Engineer. His stack spans Python (Pandas, Scikit-Learn), the MERN ecosystem (Node.js, Express, MySQL, Sequelize, Prisma, Supabase, Zustand), and desktop engineering with Electron.js. He combines ML model development with production-grade web and native desktop architectures.`;
  }

  if (lower.includes("desktop") || lower.includes("library") || lower.includes("lms")) {
    return `The Full-Stack Library Management System is a native Electron desktop application built for Quaid-e-Azam Library. It features real-time automated book tracking, secure MySQL persistence via Sequelize ORM, and a React.js frontend with Node.js/Express backend — a production-ready full-stack desktop solution.`;
  }

  if (lower.includes("bootcamp") || lower.includes("purelogics") || lower.includes("ai") || lower.includes("ml")) {
    return `Jazib is currently an AI / Machine Learning Trainee at PureLogics (Python AI Bootcamp) in Lahore, Pakistan (July 2026 – Present). The 3-month intensive program covers Python, data analysis, and predictive model development using Pandas, NumPy, and Scikit-Learn, with a focus on integrating AI endpoints into full-stack applications.`;
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
    return `You can reach Jazib Faisal at jazibfaisal66@gmail.com, on GitHub at github.com/jazibfaisal4, or LinkedIn at linkedin.com/in/jazib-faisal-5a8978322. He's open to collaborations on AI/ML and full-stack projects.`;
  }

  return `Jazib Faisal is an AI/ML Developer & Full-Stack Engineer specializing in intelligent MERN applications and Electron desktop systems. He's currently at PureLogics AI Bootcamp and has built projects including a 3D Apple showcase, Brainwave AI UI, and a Library Management System for Quaid-e-Azam Library. Ask about skills, projects, bootcamp details, or contact info!`;
}

export const promptLabResponses: Record<string, string> = {
  "Generate SQL schema for LMS": `-- Library Management System Schema
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role ENUM('admin', 'librarian', 'member') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  isbn VARCHAR(20) UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(150),
  category VARCHAR(50),
  copies_total INT DEFAULT 1,
  copies_available INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE borrow_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE NOT NULL,
  returned_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);`,

  "Create Express API route for book checkout": `// routes/checkout.js
const express = require('express');
const { Book, BorrowRecord } = require('../models');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { userId, bookId } = req.body;
  const book = await Book.findByPk(bookId);

  if (!book || book.copies_available < 1) {
    return res.status(400).json({ error: 'Book unavailable' });
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const record = await BorrowRecord.create({
    user_id: userId,
    book_id: bookId,
    due_date: dueDate,
  });

  await book.decrement('copies_available');
  res.status(201).json({ record, message: 'Checkout successful' });
});

module.exports = router;`,

  "Build Scikit-Learn model pipeline": `# ML Pipeline — Book Demand Prediction
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

df = pd.read_csv('borrow_history.csv')
X = df[['month', 'category_encoded', 'prev_borrows']]
y = df['high_demand']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print(classification_report(y_test, model.predict(X_test)))`,
};

export const featuredCodeSnippet = `// Electron Main Process — Secure IPC Bridge
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile('index.html');
}

ipcMain.handle('books:checkout', async (_, payload) => {
  const { userId, bookId } = payload;
  return await checkoutService.process(userId, bookId);
});

app.whenReady().then(createWindow);`;

export const codeAuditInsights = [
  {
    line: 1,
    label: "Architecture",
    insight: "Electron main process correctly separated from renderer — follows secure desktop app pattern.",
  },
  {
    line: 10,
    label: "Security",
    insight: "contextIsolation: true + nodeIntegration: false prevents XSS-to-RCE escalation.",
  },
  {
    line: 11,
    label: "Type Safety",
    insight: "Preload script bridge enables typed IPC contracts between React UI and Node backend.",
  },
  {
    line: 17,
    label: "Performance",
    insight: "ipcMain.handle uses async/await — non-blocking checkout won't freeze the UI thread.",
  },
  {
    line: 19,
    label: "Data Layer",
    insight: "checkoutService abstracts Sequelize ORM calls — clean separation of concerns.",
  },
];
