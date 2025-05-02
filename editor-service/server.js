const express = require('express');
const cors = require('cors');
const { DocumentEditorServer } = require('@syncfusion/ej2-documenteditor-server');

const app = express();
const port = 6002;

// allow calls from your React app
app.use(cors({
  origin: ['http://localhost:3000']
}));

// mount all of the document-editor endpoints under /api/documenteditor
const docServer = new DocumentEditorServer();
app.use('/api/documenteditor', docServer.router());

// (optional) serve a simple health check
app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`📄 Editor service listening on http://localhost:${port}`));
