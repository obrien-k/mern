const express = require('express');
const router = express.Router();
const IpBan = require('../../../models/utils/ipBan');
const GeoIp = require('../../../models/utils/geoIp');

router.get('/', async (req, res) => {
    try {
        const ipAddress = req.query.ip; // Get the IP address from the query parameter

        if (!ipAddress) {
            return res.status(400).send('IP address is required');
        }

        const IPNum = ipToUnsigned(ipAddress);

        // The initial character of the IP address before the first dot
        const A = ipAddress.substring(0, ipAddress.indexOf('.'));

        // Get IP bans from the database
        const IPBans = await IpBan.find({
            fromIP: { $gte: A << 24 },
            toIP: { $lte: (A + 1) << 24 - 1 }
        });

        for (const IPBan of IPBans) {
            if (IPNum >= IPBan.fromIP && IPNum <= IPBan.toIP) {
                return res.send(true); // IP is banned
            }
        }

        res.send(false); // IP is not banned

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

function ipToUnsigned(IP) {
    return parseInt(IP.split('.').reduce((ipInt, octet) => (ipInt << 8) + parseInt(octet), 0));
}

module.exports = router;
