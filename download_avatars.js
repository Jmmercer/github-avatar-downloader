var request = require('request');
var dotenvResult = require('dotenv').config();
var fs = require('fs');
var GITHUB_USER = process.env.GITHUB_USER;
var UA = 'Jmmercer';
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var repoOwner = process.argv[2];
var repoName = process.argv[3];


if (dotenvResult.error){
  throw '.env missing'
}
if (!GITHUB_USER || !GITHUB_TOKEN) {
  throw 'Missing Token, or User from .env';
}
if (!repoOwner || !repoName){
  throw 'Either Repo owner, or repo name not given';
}
if (process.argv.length !== 4) {
  throw 'Incorrect number of arguments';
}

console.log('Welcome to the GitHub Avatar Downloader');
getRepoContributors(repoOwner, repoName);

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log('Requested URL: ' + requestURL)
  var request = require('request');
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, GITHUB_USER, function(err, response, body){
    if (response.statusCode === 404) {
      throw '404, Owner/Repo not found.';
    }
    if (response.statusCode === 401) {
      throw '401, Bad credentials'
    }

    console.log('Response Status Code: ', response.statusCode);
    console.log(JSON.parse(body, {}))
    JSON.parse(body, {}).forEach(function(contributor){
      console.log(contributor.avatar_url)
      if (!fs.statSync('./avatars'))
        fs.mkdirSync('./avatars');
      var filePath = './avatars/' + contributor.login + '.png';
      console.log(contributor.avatar_url)
      downloadImageByURL(contributor.avatar_url, filePath);
    });
  });
}
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err){
      throw err;
    })
    .on('response', function (response){
      console.log('Downloaded!')
    })
    .pipe(fs.createWriteStream(filePath));
}
//14eabf81f8ba895f6abf4d7ab0120553c442811f