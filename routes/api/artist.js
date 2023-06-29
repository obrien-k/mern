const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArtistAlias = require('../../models/artist/ArtistAlias');
const Artist = require('../../models/artist/Artist');
const SimilarArtist = require('../../models/artist/SimilarArtist');
const ArtistTag = require('../../models/artist/ArtistTag');
const Concert = require('../../models/artist/Concert');


// Route to get an artist by artist_id
router.get('/artist/:artist_id', async (req, res) => {
    try {
        const artist_id = parseInt(req.params.artist_id);
        const artist = await Artist.findOne({ artist_id });
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get similar artists for a given artist_id
router.get('/artist/:artist_id/similar-artists', async (req, res) => {
    try {
        const artist_id = parseInt(req.params.artist_id);
        const similarArtists = await SimilarArtist.find({ 'artist_id': artist_id });
        if (!similarArtists) {
            return res.status(404).json({ error: 'Similar artists not found' });
        }
        res.json(similarArtists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new artist
router.post('/artist', async (req, res) => {
    try {
        const { artist_id, name, revision_id, vanity_house, last_comment_id } = req.body;
        const newArtist = new Artist({ artist_id, name, revision_id, vanity_house, last_comment_id });
        await newArtist.save();
        res.json({ success: true, artist: newArtist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ArtistAlias routes
router.get('/artist-alias/:artistID', async (req, res) => {
  try {
    const artistID = parseInt(req.params.artistID);
    const artistAlias = await ArtistAlias.findOne({ artistID });
    if (!artistAlias) {
      return res.status(404).json({ error: 'Artist alias not found' });
    }
    res.json(artistAlias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/artist-alias', async (req, res) => {
  try {
    const { artistID, name, redirect, userID } = req.body;
    const newArtistAlias = new ArtistAlias({ artistID, name, redirect, userID });
    await newArtistAlias.save();
    res.json({ success: true, artistAlias: newArtistAlias });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new similar artist
router.post('/similar-artist', async (req, res) => {
    try {
        const { artist_id, similar_artist, votes } = req.body;
        const newSimilarArtist = new SimilarArtist({ artist_id, similar_artist, votes });
        await newSimilarArtist.save();
        res.json({ success: true, similarArtist: newSimilarArtist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ArtistTag routes
router.get('/artist-tag/:tag_id', async (req, res) => {
  try {
    const tag_id = parseInt(req.params.tag_id);
    const artistTags = await ArtistTag.find({ tag_id });
    if (!artistTags) {
      return res.status(404).json({ error: 'Artist tag not found' });
    }
    res.json(artistTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/artist-tag', async (req, res) => {
  try {
    const { tag_id, artist_id, positive_votes, negative_votes, user_id } = req.body;
    const newArtistTag = new ArtistTag({ tag_id, artist_id, positive_votes, negative_votes, user_id });
    await newArtistTag.save();
    res.json({ success: true, artistTag: newArtistTag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Concert routes
router.get('/concert/:concert_id', async (req, res) => {
  try {
    const concert_id = parseInt(req.params.concert_id);
    const concert = await Concert.findOne({ concert_id });
    if (!concert) {
      return res.status(404).json({ error: 'Concert not found' });
    }
    res.json(concert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/concert', async (req, res) => {
  try {
    const { concert_id, topic_id } = req.body;
    const newConcert = new Concert({ concert_id, topic_id });
    await newConcert.save();
    res.json({ success: true, concert: newConcert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;


