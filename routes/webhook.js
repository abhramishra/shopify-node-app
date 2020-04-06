/**
 * ./routes/webhooks.js
 * This is where you'll set up any webhook endpoints you plan on using. This includes the middleware
 * to check if a request from a webhook is legitemate.
 */
const express = require('express');
const verifyWebhook = require('../middleware').verifyWebhook;

const router = express.Router();

router.post('/uninstall_shop', verifyWebhook, (req, res) => {
  const domain = req.body.myshopify_domain;
  const query = Shop.findOne({ shopify_domain: domain }).exec();
  if (query) {
    query.then(shop => {
      shop.isActive = false;
      shop.save().then(shopInActive => {
        console.log(shopInActive);
        res.sendStatus(200);
      });
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
