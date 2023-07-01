# Stellar

Codename Stellar is a community organization platform with tooling designed for content curation and quality control. This project's aim is to reproduce utopia, this is a mirage.

## Installation

Requirements: Node  v16.17.0

In `./config`, create a `default.json` file like below:

```
{
  "mongoURI": "your_mongo_uri",
  "jwtSecret": "your_secret_token",
  "githubClientId": "your_github_client",
  "githubSecret": "your_github_secret",
  "SITE_NAME":"Stellargraph"
}
```

After verifying your shell's running version of node with `node -v`, run `npm i -D` in the root directory, which installs the backend server with development dependencies. Once complete, do the same in the client directory to install the frontend. The command `npm run dev` will start the test environment. 

Access the API via `http://localhost:3000/api/auth` (or the hostname:port set, if customized), and the frontend will automatically load to your web browser once react-scripts loads.

## Database population

The database isn't preloaded, but `./api/taskRunner` is a temporary solution that _should_ eventually lead to a "first run" task that pre-populates a new instance. Using the corresponding `./routes/api/tasks/*.*` files should generally be avoided unless certain it's necessary and should be considered "experimental" endpoints. An exception is the `./api/taskRunner/generate` endpoint, which generates some forum data and user ranks. The user rank data is good, but a lot of the forum data is fairly incompatible with our model so be wary of mis-placed references (e.g. ForumTopics missing related ForumPosts).

## Invitation system

Stellar in it's default configuration requires an invitation to join an instance. You must create a user with a "SysOp" rank to have administrative priveleges. The default user rank is "User". Creating an invite generates a token that is sent to the provided email which can be used by the invitee to register an account. TODO: Invitation generation/expiration scheduling implementation -- work has started in `./routes/api/tasks/`

In the code, one might notice the filename structure using "referral" and that there's bypassed code related to it. This is intended for future development.

## Subscriptions

Subscriptions are implemented albeit very broken, this component handles notifications for subscribed communities, threads, etc. It has been deactivated via line 2 in `./client/src/components/layout/PrivateFooter.js`.

## Codebase structure

### React

Stellar's front end is based on react, which is in the `./client` directory. 

```
- /client
  - /src
    - App.js* -- Authentication check for delivering PrivateLayout or PublicLayout
    - /actions -- api request event controllers
    - /components
      - /admin
      - /auth
      - /layout
      - /pages
      - /profile
      - /sections
      - /sidebar
      - /toast
    - /config
    - /hooks/useForumData
    - /reducers
    - /static
    - /styles -- TODO: move to static dir
    - /utils -- api request via axios
```

### Express

Express powers Stellar's back-end, the routes for which can be found in the `./routes/api` directory. The `server.js` file in the root directory starts and configures the service. This connects with NoSQL database models located in the eponymous directory, `./models`.

```
- /routes
  - /api
    - /sections
      - /forum
      - artist
    - /services
      - inviteTree
      - referralRoute
      - referralService
    - /tasks -- experimental, use with caution
      - generateTestData
      - taskRunner
    - /util -- similar to tasks, less experimental
      - tools
      - permissions
      - modTools
```

### MongoDB

```
- /models
  - /api
    - ApiApplication
    - ApiUser
    - Permission
  - /artist
    - Artist
    - ArtistAlias
    - ArtistTag
    - Concert
    - SimilarArtist
  - /bookmark
    - BookmarkArtist
    - BookmarkCollage
    - BookmarkCommunity
    - BookmarkRequest
  - /comment
    - Comment 
    - CommentEdit 
    - CommentEditTmp 
  - /donation
    - BitcoinDonation
    - Donation
    - DonorForumUsername
    - DonorReward
  - /forum
    - Forum
    - ForumCategory
    - ForumLastReadTopic
    - ForumPollVote
    - ForumPost
    - ForumSpecificRule
    - ForumTopic
    - ForumTopicNote
  - /profile
    - Invite
    - InviteTree
    - Stylesheet
  - /utils -- likely being removed
- Applicant
- Blog
- ContestLeaderboard
- ContetestType
- CoverArt
- DoNotUpload
- FeaturedAlbum
- FeaturedMerch
- Friend
- News
- Note
- Post
- Profile
- Subscriptions
- Thread
- User
- UserRank
```