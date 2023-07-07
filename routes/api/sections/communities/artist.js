const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const ArtistAlias = require("../../../../models/artist/ArtistAlias");
const Artist = require("../../../../models/artist/Artist");
const SimilarArtist = require("../../../../models/artist/SimilarArtist");
const ArtistTag = require("../../../../models/artist/ArtistTag");
const Concert = require("../../../../models/artist/Concert");

// Route to get artists
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const artists = await Artist.find();
    if (!artists) {
      return res.status(404).json({ error: "Artists not found" });
    }
    res.json(artists);
  })
);

// Route to get an artist by artist_id
router.get(
  "/:artist_id",
  asyncHandler(async (req, res) => {
    const artist_id = parseInt(req.params.artist_id);
    const artist = await Artist.findOne({ artist_id });
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.json(artist);
  })
);

// Route update an artist by artist_id
router.put(
  "/:artist_id",
  asyncHandler(async (req, res) => {
    const artist_id = parseInt(req.params.artist_id);
    const artist = await Artist.findOneAndUpdate({ artist_id }, req.body, {
      new: true,
    });
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.json(artist);
  })
);

// @route   GET api/artists/:artistId/groups
// @desc    Get all groups an artist is associated with
// @access  Private
router.get(
  "/:artistId/groups",
  auth(),
  asyncHandler(async (req, res) => {
    const { artistId } = req.params;
    const groups = await Group.find({ artist: artistId }).populate(
      "artist",
      "name"
    );
    res.json(groups);
  })
);

// Get Artist history by id
router.get(
  "/history/:artistId",
  asyncHandler(async (req, res) => {
    const history = await ArtistHistory.find({ artist: req.params.artistId });
    res.json(history);
  })
);

// Rever artist history by id
router.post(
  "/revert/:historyId",
  asyncHandler(async (req, res) => {
    const historyEntry = await ArtistHistory.findById(req.params.historyId);
    if (historyEntry) {
      const artist = await Artist.findById(historyEntry.artist);
      artist.set(historyEntry.data);
      await artist.save();
      res.json({ message: "Artist information reverted successfully." });
    } else {
      res.status(404).send("History entry not found.");
    }
  })
);

// Route to get similar artists for a given artist_id
router.get(
  "/:artist_id/similar-artists",
  asyncHandler(async (req, res) => {
    const artist_id = parseInt(req.params.artist_id);
    const similarArtists = await SimilarArtist.find({ artist_id: artist_id });
    if (!similarArtists) {
      return res.status(404).json({ error: "Similar artists not found" });
    }
    res.json(similarArtists);
  })
);

// Route to add a new artist
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, revision_id, vanity_house, last_comment_id } = req.body;
    const newArtist = new Artist({
      name,
      revision_id,
      vanity_house,
      last_comment_id,
    });
    await newArtist.save();
    res.json({ success: true, artist: newArtist });
  })
);

// ArtistAlias routes
router.get(
  "/artist-alias/:artistID",
  asyncHandler(async (req, res) => {
    const artistID = parseInt(req.params.artistID);
    const artistAlias = await ArtistAlias.findOne({ artistID });
    if (!artistAlias) {
      return res.status(404).json({ error: "Artist alias not found" });
    }
    res.json(artistAlias);
  })
);

router.post(
  "/artist-alias",
  asyncHandler(async (req, res) => {
    const { artistID, name, redirect, userID } = req.body;
    const newArtistAlias = new ArtistAlias({
      artist,
      redirect,
      user,
    });
    await newArtistAlias.save();
    res.json({ success: true, artistAlias: newArtistAlias });
  })
);

// Route to add a new similar artist
router.post(
  "/similar-artist",
  asyncHandler(async (req, res) => {
    const { artist_id, similar_artist, votes } = req.body;
    const newSimilarArtist = new SimilarArtist({
      artist_id,
      similar_artist,
      votes,
    });
    await newSimilarArtist.save();
    res.json({ success: true, similarArtist: newSimilarArtist });
  })
);

// ArtistTag routes
router.get(
  "/artist-tag/:tag_id",
  asyncHandler(async (req, res) => {
    const tag_id = parseInt(req.params.tag_id);
    const artistTags = await ArtistTag.find({ tag_id });
    if (!artistTags) {
      return res.status(404).json({ error: "Artist tag not found" });
    }
    res.json(artistTags);
  })
);

router.post(
  "/artist-tag",
  asyncHandler(async (req, res) => {
    const { tag_id, artist_id, positive_votes, negative_votes, user_id } =
      req.body;
    const newArtistTag = new ArtistTag({
      tag,
      artist,
      positive_votes,
      negative_votes,
      user,
    });
    await newArtistTag.save();
    res.json({ success: true, artistTag: newArtistTag });
  })
);

// Concert routes
router.get(
  "/concert/:concert_id",
  asyncHandler(async (req, res) => {
    const concert_id = parseInt(req.params.concert_id);
    const concert = await Concert.findOne({ concert_id });
    if (!concert) {
      return res.status(404).json({ error: "Concert not found" });
    }
    res.json(concert);
  })
);

router.post(
  "/concert",
  asyncHandler(async (req, res) => {
    const { concert_id, topic_id } = req.body;
    const newConcert = new Concert({ concert_id, topic_id });
    await newConcert.save();
    res.json({ success: true, concert: newConcert });
  })
);

module.exports = router;
