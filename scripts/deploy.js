#!/usr/bin/env node

'use strict';

const path = require('path');

const { Client } = require('basic-ftp');

require('dotenv').config();

const DIR_PUBLIC = path.join(__dirname, '../public');

(async function main() {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: 'foursevens.be',
      user: process.env.DEPLOY_FTP_USERNAME,
      password: process.env.DEPLOY_FTP_PASSWORD,
    });
    await client.uploadFromDir(DIR_PUBLIC, process.env.DEPLOY_FTP_DIR);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.close();
  }
})();
