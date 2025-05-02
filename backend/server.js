const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const bcrypt   = require('bcrypt');

const app  = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb://localhost:27017/wordProcessorLogs', {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username:     { type: String, unique: true, required: true },
  email:        { type: String, required: true },
  passwordHash: { type: String, required: true },
  loginAttempts:[{ time: Date, success: Boolean }]
});
const User = mongoose.model('User', userSchema);

// SIGN UP
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'username, email and password are required' });
    }
    if (await User.findOne({ username })) {
      return res.status(409).json({ success: false, error: 'User already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username, email, passwordHash,
      loginAttempts: [{ time: new Date(), success: true }]
    });
    return res.json({
      success: true,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during signup' });
  }
});

// LOG IN
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    user.loginAttempts.push({ time: new Date(), success: match });
    await user.save();
    if (!match) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
    return res.json({
      success: true,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during login' });
  }
});

// ADMIN: list users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v -passwordHash');
    return res.json({ success: true, users });
  } catch (err) {
    console.error('Fetch users error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error fetching users' });
  }
});
