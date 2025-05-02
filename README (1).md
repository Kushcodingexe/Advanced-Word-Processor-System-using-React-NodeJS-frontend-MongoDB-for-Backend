**Advanced-Word-Processor-System-using-React-NodeJS-frontend-MongoDB-for-Backend**

A full-stack word-processing web application with user authentication, MongoDB logging, Syncfusion DocumentEditor, text-to-speech, sentiment analysis, and more.

📁 Repository Structure

```text
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
```
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

```
cd backend
npm install
npm start
```

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
```
cd ../frontend
npm install
npm start
```
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

![image](https://github.com/user-attachments/assets/c355f8de-ca80-443e-b5a0-cc725514ff7b)

This login interface implements a secure authentication gateway for our Advanced Word Processing System and shows the email and password fields for user verification. 
 The dual-option approach here allows both existing users to authenticate and new users to navigate to registration, ensuring comprehensive access control to the document management system.

![image](https://github.com/user-attachments/assets/34dea6c3-029f-492b-9819-d33ed42a8183)

The registration interface has the sign up approach and it allows to have new users to create their profiles by entering their name, email address and password. 

![image](https://github.com/user-attachments/assets/52d29e25-9274-4f6c-94c1-d581850e3036)

This is the case of the user trying to log in while entering an invalid password or username and we can see that there is an error shown by the red colour. This feature ensures that the user will have to enter the correct details to log into our application.

![image](https://github.com/user-attachments/assets/1ad0425b-14e4-4532-8951-bd4c26b6ddd8)

This is the case of the user trying to sign-up form shows an error message in red text, alerting users that required fields must be completed before registration can proceed. 
This validation feature prevents incomplete account creation and ensures all necessary user information is collected for proper system access

![image](https://github.com/user-attachments/assets/5eea213d-b8db-468a-855d-5b324827272b)

This is the case where the sign-up form shows a duplicate account detection feature, as seen in the red error message "User already exists" when attempting to register with an email which is already in the system. This security feature prevents account duplication and protects the existing user data.

![image](https://github.com/user-attachments/assets/95050dcf-d179-4038-9b44-9e781b253f88)

The word processor interface presents a formatting toolbar with text styling, layout, and document structure options for efficient document creation. The right panel provides a detailed text formatting controls for font properties, color selection and paragraph settings, which enables the users to customize their documents according to specific requirements.

![image](https://github.com/user-attachments/assets/76e4b2ae-a79f-4688-9b14-58b2d3583fa0)

This image shows that we can insert formatted tables, images and the highlighted green text shows that the interface allows real-time text formatting and can simultaneously handle text styling and multimedia content integration.

![image](https://github.com/user-attachments/assets/94a9a1cc-6c48-41bb-85e5-9f0ccf633722)

The file management dialog overlay provides document browsing functionality, displaying folders and files with timestamps and size information. The integration allows users to access their document repository directly within the editing interface and facilitates the file opening and saving operations without leaving the application environment.

![image](https://github.com/user-attachments/assets/58430dcd-c278-4900-908c-72b44457df29)
The system implements sentiment analysis functionality, evaluating text content and displaying a positive emotional assessment with "Positive" indicator above the document. The interface processes the phrase "Hello there you are wonderful!" to determine the sentiment tone, showing the advanced text analysis ability integrated within the document editing environment.

![image](https://github.com/user-attachments/assets/0279a7e3-9cbf-4a23-a69f-4fe62fc683fc)

This screenshot showcases the Header editing feature in the Advanced Word Processing and Formatting System. Users can insert and customize headers, including positioning and page-specific settings such as "Different First Page" and "Different Odd & Even Pages." This allows for professional document formatting and greater control over page layout.

![image](https://github.com/user-attachments/assets/d232efa6-2a65-4840-bf61-f2b52241249c)
This image highlights the commenting and search and find features of the system. The user can search for specific words using the Navigation panel and view or add comments for collaboration on the right. This enables real-time feedback and efficient document review during multi-user editing.
![image](https://github.com/user-attachments/assets/b4e5b9d8-3e56-4e52-9e1a-2e7bfb31a9d0)

This image shows the "Page Setup" dialog box from a word processing application, such as Google Docs or a similar editor. It allows users to configure various settings for how their document pages are formatted.
![image](https://github.com/user-attachments/assets/d89a956c-8ed8-4240-bbd9-c3b1684c16b7)

This image shows the "Page Setup" dialog box with the "PAPER" tab selected. It allows users to configure the size of the page for their document.
![image](https://github.com/user-attachments/assets/907c2115-816c-4115-9f1e-2fa9ad6119ee)
This screenshot shows the "Page Setup" dialog box with the "LAYOUT" tab selected. This tab allows customization of how the page content is laid out, especially for headers, footers, and different page styles.
![image](https://github.com/user-attachments/assets/e9ba1fab-58af-4234-8724-84998ae3e057)
The editor is displaying a document with text and an endnote, where editing is being restricted by setting the document to "Read only" mode.
![image](https://github.com/user-attachments/assets/3a885873-2e97-498b-ab17-6a3b1c26e993)
The editor is allowing only 1 character in a line using the line width section, this can be adjusted to required number of characters.
![image](https://github.com/user-attachments/assets/c71ce7f3-b97e-439e-b9c6-bde8850651b4)
This editor includes text formatting, track changes, comments, and restriction controls for collaborative editing. It also offers accessibility tools like read aloud, grammar check, and sentiment analysis.
![image](https://github.com/user-attachments/assets/7fce13ac-13da-4521-bbaa-f3768b4454c1)
This image shows the "Borders and Shading" dialog box in the editor, allowing the user to apply border styles to selected text or paragraphs. Users can choose border types (None, Box, All, Custom), set style, width, and colour, with a preview displayed on the right.
![image](https://github.com/user-attachments/assets/ecce67fc-7411-486d-a346-aeb012bf2646)
This image shows the document editor with paragraph marks (¶) enabled, revealing all line breaks and paragraph endings. The text "I stay in 1st floor" is typed in the center, followed by multiple paragraph breaks, and the formatting sidebar is open for font and paragraph styling.
![image](https://github.com/user-attachments/assets/79005890-827b-4c82-bb5e-6b80f80ac28e)
The image shows a document editor where the text “I stay in 1st floor” is typed and a numbered list is added below it.
![image](https://github.com/user-attachments/assets/74bc5d84-0126-430b-a1a5-eeb968389f6d)
The image shows the "Columns" settings dialog with the "Two Columns" preset selected and equal column widths enabled.
![image](https://github.com/user-attachments/assets/01147c46-62ae-475e-8f9d-12052e472f71)
The image shows the terminal output of a test run where the file has passed all 6 tests successfully. It verifies component behavior such as rendering toolbar buttons, handling logout, and generating alerts for speech and grammar checks.
