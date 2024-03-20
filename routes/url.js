const express = require("express");
const { handle_generate_new_short_url, handle_get_analytics, handle_redirect_link } = require("../controllers/url");

const router = express.Router();

router.post('/', handle_generate_new_short_url);

router.get('/analytics/:shortId', handle_get_analytics);

router.get('/:shortId', handle_redirect_link);

module.exports = router;