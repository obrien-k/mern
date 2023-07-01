const express = require('express');
const dns = require('dns');
const router = express.Router();

// Function to validate an IP address
function isValidIP(ip) {
    const segments = ip.split('.');
    if (segments.length !== 4) {
        return false;
    }
    for (let i = 0; i < segments.length; i++) {
        if (!isNumeric(segments[i])) {
            return false;
        }
    }
    return true;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Gets the hostname for an IP address
router.get('/get-host-by-ip', (req, res) => {
    const ipAddress = req.query.ip;
    
    if (!isValidIP(ipAddress)) {
        return res.send(ipAddress);
    }

    dns.reverse(ipAddress, (err, hostnames) => {
        if (err) {
            return res.send(ipAddress);
        }
        res.send(hostnames[0] || ipAddress);
    });
});

// Looks up the full host of an IP address.
const lookupIp = (ip) => {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, hostnames) => {
      if (err) reject('');
      else resolve(hostnames[0]);
    });
  });
};

// Get country code by IP
const getCountryCode = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data.country;
  } catch (error) {
    console.error(error);
    return '';
  }
};

// Endpoint for looking up host by IP
app.post('/lookup-host', async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP is required' });
  }

  try {
    const host = await lookupIp(ip);
    const countryCode = await getCountryCode(ip);
    return res.json({ host, countryCode });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to lookup IP' });
  }
});
module.exports = router;
