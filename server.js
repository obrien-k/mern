const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// todo const session = require('express-session');

/*app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set secure to true if using HTTPS
}));*/

// Init app
const app = express();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Connect Database
connectDB();

// Define routes
app.get("/", (req, res) => res.send("API Running"));

// User routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/stylesheet", require("./routes/api/stylesheet"));

// Comments/announcements/subscriptions placeholder
app.use("/api/announcements", require("./routes/api/announcements"));
app.use("/api/subscriptions", require("./routes/api/subscriptions"));

// Services routes
app.use("/api/profile/referral", require("./routes/api/profile/referralRoute"));
app.use("/api/profile/invite-tree", require("./routes/api/profile/inviteTree"));

// Communities routes
app.use(
  "/api/communities",
  require("./routes/api/sections/communities/communitiesRoute")
);
app.use(
  "/api/contributions",
  require("./routes/api/sections/communities/contributions")
);
app.use("/api/artist", require("./routes/api/sections/communities/artist"));
app.use("/api/comments", require("./routes/api/comments"));

// Forums routes
const forumsBasePath = "/api/forums";
const forumsSectionPath = "./routes/api/sections/forum";
app.use(
  `${forumsBasePath}/categories`,
  require(`${forumsSectionPath}/forumCategory`)
);
app.use(
  `${forumsBasePath}/last-read-topic`,
  require(`${forumsSectionPath}/forumLastReadTopic`)
);
app.use(`${forumsBasePath}/poll`, require(`${forumsSectionPath}/forumPoll`));
app.use(
  `${forumsBasePath}/poll-vote`,
  require(`${forumsSectionPath}/forumPollVote`)
);
app.use(`${forumsBasePath}/posts`, require(`${forumsSectionPath}/forumPost`));
app.use(
  `${forumsBasePath}/:id/topics/notes`,
  require(`${forumsSectionPath}/forumTopicNote`)
);
app.use(forumsBasePath, require(`${forumsSectionPath}/forumRoute`));

// Task Runner
app.use("/api/taskRunner", require("./routes/api/tasks/taskRunner"));
app.use(
  "/api/taskRunner/fix-posts",
  require("./routes/api/tasks/fixForumPosts")
);

// Mod tools
app.use("/api/tools", require("./routes/api/util/tools"));
app.use("/api/tools/permissions", require("./routes/api/util/permissions"));
app.use("/api/check-ip-ban", require("./routes/api/util/checkIpBan"));

// handle any downstream errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
