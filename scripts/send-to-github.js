// @flow
const exec = require('child_process').exec;

const add = 'git add . ';
const commit = '&& git commit -am "build update" ';
const publish = '&& git subtree push --prefix build origin gh-pages ';

exec(add + commit + publish, (error, stdout, stderr) => {
  if (error) {
    console.log(error);
  }
  if (stdout) {
    console.log(error);
  }
  if (stderr) {
    console.log(error);
  }
  console.log('Sent to github pages');
});

