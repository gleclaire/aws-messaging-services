'use strict';

const localtunnel = require('localtunnel');
const urlParser = require('url');

function createLocalTunnel(port, appUrl) {
  if (!appUrl) {
    console.error('Set environment variable: SNS_HTTP_APP_URL (f.ex. in file .env)');
    process.exit(1);
  }

  const appDomain = urlParser.parse(appUrl).host;
  if (appDomain.split('.')[1] !== 'localtunnel') {
    console.error('Set proper: SNS_HTTP_APP_URL (f.ex. in file .env) if you want to use LocalTunnel.');
  }
  const tunnelSubdomain = appDomain.split('.').shift();

  const tunnelOpts = {
    subdomain: tunnelSubdomain
  };
  localtunnel(port, tunnelOpts, (err, tunnel) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log(`External URL: ${tunnel.url}`);
    }
  });
}

module.exports = {
  createLocalTunnel
};
