//=============================================================================//
// Imports
//=============================================================================//

const github = require('octonode');

//=============================================================================//

const client = github.client('6c8b7920fb59b87513264467894b8267453bdc68');

//=============================================================================//
// Exports
//=============================================================================//

module.exports = {
    ghrepo: client.repo('netacad/thanh_test'),
    jenkins_token: 'drevil',
    jenkins_username: 'thanhuyn',
    jenkins_password: 'Xoujas123!@#',
    jenkins_job_sanity: 'https://engci-jenkins-sjc2.cisco.com/jenkins/job/team_CA-CSR-SM-LE-SGME/job/thanh1_test'
};

//=============================================================================//