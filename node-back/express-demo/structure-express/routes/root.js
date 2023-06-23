const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Send back a respond!!!!");

});

module.exports = router;
