//=============================================================================//
// Imports
//=============================================================================//

const express = require('express');
const _ = require('lodash');
const github = require('octonode');
const request = require('request');
const router = express.Router();
const Config = require('./config');

//=============================================================================//
// Variables
//=============================================================================//

const whitelist_branches = ['featureC', 'master']

//=============================================================================//
// GET - Homepage.
//=============================================================================//

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Server is online.'
    });
});

//=============================================================================//
// POST
//=============================================================================//

router.post('/', function (req, res) {

    payload = JSON.parse(req.body.payload);

    // If hook is not a pull request then exit.

    if (_.isUndefined(payload.action)){
        res.sendStatus('200')
    }
    else {

        let action = JSON.stringify(payload.action);
        action = action.replace(/"/g, "");
    
        if (['opened', 'reopened'].includes(action)) {
    
            // Parse for pull request committed SHA.
            
            let sha = payload.pull_request.head.sha;
            sha = JSON.stringify(sha).replace(/"/g, "")
            
            // Parse for branch name.
            
            let branch = payload.pull_request.base.ref;
            branch = JSON.stringify(branch).replace(/"/g, "")
            
            if(whitelist_branches.includes(branch)) {
                
                // Update GitHub status check to pending.

                Config.ghrepo.status(sha, {
                    "state": "pending",
                    "target_url": Config.jenkins_job_sanity,
                    "context": "Sanity Check",
                    "description": "Waiting for sanity result"
                }, function () {
                    console.log("Updated Github status check.")
                });
        
                
                // Trigger Jenkins build.
                
                let job_api = `${Config.jenkins_job_sanity}/buildWithParameters?token=${Config.jenkins_token}&SHA=${sha}`
                
                console.log(sha)
                console.log(job_api)

                request(job_api, {
                    method: "POST",
                    auth: {
                        user: Config.jenkins_username,
                        pass: Config.jenkins_password
                    }
                }, function (error, response, body) {
                    if(error){
                        console.log('Error triggering Jenkins', arguments);
                    }
                });
            }
    
        }
    }

})

//=============================================================================//
// Export
//=============================================================================//

module.exports = router;

//=============================================================================//