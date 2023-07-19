const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Sentry = require("@sentry/node");
const cookieParser = require("cookie-parser");
const { doubleCsrf } = require("csrf-csrf");
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

// Init app
const app = express();
/*
// init Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
*/
//Init Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Connect Database
connectDB();

const cookiePrefix = isProduction ? "__Host-" : "";
const secureCookie = isProduction ? true : false;

const doubleCsrfUtilities = doubleCsrf({
  getSecret: () => "Secret",
  cookieName: `${cookiePrefix}psifi.x-csrf-token`,
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: secureCookie,
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

const { doubleCsrfProtection, generateToken } = doubleCsrfUtilities;

// CSRF Token generation route
app.get("/api/csrf-token", (req, res) => {
  const csrfToken = generateToken(res, req);
  res.json({ csrfToken });
});

app.use(doubleCsrfProtection);

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
/*
app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});
*/
// handle any downstream errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log("Error", err.message);
  console.log(err, "117 server.js");
  res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
