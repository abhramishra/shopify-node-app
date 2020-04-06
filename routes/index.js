const express = require('express');
const verifyOAuth = require('../helpers').verifyOAuth;
const mongoose = require('mongoose');

const Shop = mongoose.model('Shop');

const router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
  const query = Object.keys(req.query)
    .map(key => `${key}=${req.query[key]}`)
    .join('&');
  if (req.query.shop) {
    const shopDomain = req.query.shop;
    Shop.findOne(
      { shopify_domain: req.query.shop, isActive: true },
      (err, shop) => {
        if (!shop) {
          return res.redirect(`/install/?${query}`);
        }
        if (verifyOAuth(req.query)) {
          return res.render('app/app', {
            apiKey: process.env.SHOPIFY_API_KEY,
            appName: process.env.APP_NAME,
            shop,
            shopDomain,
          });
        } else {
          return res.render('shopExists', { title: 'shop already installed' });
        }
      }
    );
  } else {
    return res.render('index', { title: 'Welcome to your example app' });
  }
});

router.get('/error', (req, res) =>
  res.render('error', { message: 'Something went wrong!' })
);

module.exports = router;
