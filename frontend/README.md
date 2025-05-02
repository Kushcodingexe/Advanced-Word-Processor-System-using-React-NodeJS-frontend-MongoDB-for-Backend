**Advanced-Word-Processor-System-using-React-NodeJS-frontend-MongoDB-for-Backend**

A full-stack word-processing web application with user authentication, MongoDB logging, Syncfusion DocumentEditor, text-to-speech, sentiment analysis, and more.
📁 Repository Structure

word-document-in-react/
├── backend/ # Node.js + Express API, MongoDB logging
│ ├── package.json
│ └── server.js
└── frontend/ # React + Syncfusion DocumentEditor client
├── package.json
├── tsconfig.json
├── public/
│ └── index.html
└── src/
├── index.tsx # React entry point
├── App.tsx # App root: shows Login or Editor
├── AuthPage.tsx # Signup / Login UI
├── Default.tsx # Main editor UI
├── title-bar.ts # Syncfusion TitleBar helper
└── App.css # Global styles

🔧 Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x
- **MongoDB** running locally on default port (27017)
- A [Syncfusion license key](https://www.syncfusion.com/account/communitylicense) (free for community)

  ## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/Kushcodingexe/Advanced-Word-Processor-System-using-React-NodeJS-frontend-MongoDB-for-Backend.git
cd Advanced-Word-Processor-System-using-React-NodeJS-frontend-MongoDB-for-Backend

2. Backend Setup (Ensure MongoDB service is running on your system by running **net start MongoDB** on your elevated cmd/powershell)

**cd backend
npm install
npm start**

By default, the server will listen on http://localhost:5000 and connect to mongodb://localhost:27017/wordProcessorLogs.

POST /api/auth/signup

Body: { username, email, password }

Creates a new user (password hashed with bcrypt), returns JWT & user info.

POST /api/auth/login

Body: { username, password }

Verifies credentials, logs an attempt, returns JWT & user info.

GET /api/admin/users

(Protected) Lists all users and login-attempt logs.

3. Frontend Setup

**cd ../frontend
npm install
npm start**

The client will start on http://localhost:3000 and talk to the backend at http://localhost:5000.

⚙️ Usage
Sign Up (first time) or Log In

Supply username, email & password to sign up.

Supply username & password to log in.

Main Editor:

Upon successful auth, you’ll see the Syncfusion DocumentEditor loaded with a “Getting Started” template.

Toolbar: formatting, import/export, spell-check, etc.

Read Aloud: Select text → ▶️ “Read Aloud”

Stop: 🛑

Sentiment: 🧠 shows positive/neutral/negative.

Logout:

Click the “Logout” button in the top toolbar to return to the auth screen.

