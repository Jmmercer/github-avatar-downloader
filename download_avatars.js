var request = require('request');
var GITHUB_USER = 'Jmmercer';
var GITHUB_TOKEN = '14eabf81f8ba895f6abf4d7ab0120553c442811f';

console.log('Welcome to the GitHub Avatar Downloader');
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos' + repoOwner + '/' + '/contributors';
}

getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log('Errors: ', err);
  console.log('Result: ', result);
});
//14eabf81f8ba895f6abf4d7ab0120553c442811f