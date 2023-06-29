const express = require('express');
const connectDB = require('./config/db');
// todo const session = require('express-session');
const app = express();
require('dotenv').config()

/*app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set secure to true if using HTTPS
}));*/

const cors = require('cors');

app.use(cors());

// Connect Database
connectDB();
//
//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Use routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/stylesheet', require('./routes/api/stylesheet'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/announcements', require('./routes/api/announcements'));
app.use('/api/subscriptions', require('./routes/api/subscriptions'));
app.use('/api/services/referral', require('./routes/api/services/referralRoute'));
app.use('/api/forum', require('./routes/api/forum/forum'));
// finish forum routes
//app.use('/api/artist', require('./routes/api/artist'));
app.use('/api/taskRunner', require('./routes/api/tasks/taskRunner'));
app.use('/api/services/invite-tree', require('./routes/api/services/inviteTree'));
app.use('/api/tools', require('./routes/api/util/tools'));
app.use('/api/check-ip-ban', require('./routes/api/util/checkIpBan'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
