#!/usr/bin/env node

'use strict';

const path = require('path');

const Client = require('ssh2-sftp-client');

require('dotenv').config();

const HOST = process.env.DEPLOY_FTP_HOST || 'foursevens.be';
const PASSWORD = process.env.DEPLOY_FTP_PASSWORD;
const USERNAME = process.env.DEPLOY_FTP_USERNAME;
const DIR_LOCAL =
  process.env.DEPLOY_FTP_DIR_LOCAL || path.join(__dirname, '../public');
const DIR_REMOTE = process.env.DEPLOY_FTP_DIR_REMOTE;

(async function main() {
  const client = new Client();
  client.on('upload', (info) => {
    console.log(`uploaded ${path.relative(DIR_LOCAL, info.source)}`);
  });
  try {
    await client.connect({
      host: HOST,
      username: USERNAME,
      password: PASSWORD,
    });
    await client.uploadDir(DIR_LOCAL, DIR_REMOTE);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    client.end();
  }
})();
