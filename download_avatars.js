var request = require('request');
var GITHUB_USER = 'Jmmercer';
var UA = 'Jmmercer'
var GITHUB_TOKEN = '14eabf81f8ba895f6abf4d7ab0120553c442811f';


console.log('Welcome to the GitHub Avatar Downloader');
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log('Requested URL: ' + requestURL)
  //var request = require('request');
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  //  host: 'api.github.com'
  //  path: '/repos/jquery/jquery/contributors'
  };
  request(options, GITHUB_USER, function(err, response, body){
    if (err) throw err;
    console.log('Response Status Code: ', response.statusCode);
  });

}

getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log('Errors: ', err);
  console.log('Result: ', result);
});
//14eabf81f8ba895f6abf4d7ab0120553c442811f