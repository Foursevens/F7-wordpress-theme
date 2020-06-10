'use strict';

const path = require('path');

const { LOCALE_DEFAULT, LOCALES } = require('./options');
const wpNormalize = require('./wp-normalize.js');

const siteHost = 'admin.foursevens.be';
const siteUrl = `https://${siteHost}`;

const config = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Foursevens',
        short_name: '7777',
        start_url: '/',
        background_color: '#028280',
        theme_color: '#028280',
        display: 'minimal-ui',
        icon: 'src/images/logo-alpha.png',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    ...LOCALES.map((language) => ({
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: process.env.MEMENTO
          ? `localhost:3344/${language}`
          : `${siteHost}/${language}`,
        excludedRoutes: [
          '**/search',
          '**/settings',
          '**/themes',
          '**/users/me',
        ],
        hostingWPCOM: false, // It is not hosted on wordpress.com
        normalizer: wpNormalize(language),
        protocol: process.env.MEMENTO ? 'http' : 'https',
        useACF: false, // Don't fetch the "Advanced Custom Fields" fields.
      },
    })),
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        defaultLanguage: LOCALE_DEFAULT,
        languages: LOCALES,
        path: path.join(__dirname, '/src/intl'),
        redirect: true,
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        matomoUrl: 'https://foursevens.matomo.cloud',
        siteId: '1',
        siteUrl,
      },
    },
  ],
  siteMetadata: {
    author: 'Ines Vanlangendonck',
    contact: {
      email: 'info@foursevens.be',
      linkedin: 'foursevens',
      phone: '+32 3 450 80 30',
      twitter: 'foursevensBE',
    },
    mobilityWidget: {
      apiKey: process.env.F7_MOBILITY_WIDGET_API_KEY,
    },
    siteUrl,
  },
};

module.exports = config;
