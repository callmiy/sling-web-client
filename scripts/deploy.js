// @flow
const path = require('path');
const copydir = require('copy-dir');

const buildDir = path.resolve('.', 'build');
const deployDir = path.resolve('..', 'sling-api', 'web-client');
copydir.sync(buildDir, deployDir);

