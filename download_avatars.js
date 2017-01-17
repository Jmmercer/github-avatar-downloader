var request = require('request');
var fs = require('fs');
var GITHUB_USER = 'Jmmercer';
var UA = 'Jmmercer'
var GITHUB_TOKEN = '14eabf81f8ba895f6abf4d7ab0120553c442811f';
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log(process.cwd());

if (!repoOwner || !repoName){
  throw 'Either Repo owner, or repo name not given';
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
    if (err) throw err;

    console.log('Response Status Code: ', response.statusCode);
    //console.log(body);
    JSON.parse(body, {}).forEach(function(contributor){
      console.log(contributor.avatar_url)
      fs.mkdirSync('/home/vagrant/avatars/');
      var filePath = '/home/vagrant/avatars/' + contributor + '.jpg';
      console.log(contributor.avatar_url)
      downloadImageByURL(contributor.avatar_url, filePath);
    });
    //console.log(JSON.parse(body, {}))
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