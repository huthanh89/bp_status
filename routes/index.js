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

const whitelist_branches = ['featureC']

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
                    "target_url": "http://ci.mycompany.com/job/hub/3",
                    "context": "Sanity Check",
                    "description": "Waiting for sanity result"
                }, function () {
                    console.log("Updated Github status check.")
                });
        
                // Trigger Jenkins build.
        
                let job_api = `http://ec2-18-206-252-202.compute-1.amazonaws.com:8080/job/practice_jenkins/buildWithParameters?token=${Config.jenkins_token}&SHA=${sha}`
        
                request(job_api, {
                    method: "POST",
                    auth: {
                        user: Config.jenkins_username,
                        pass: Config.jenkins_password
                    }
                }, function (error, response, body) {
                    if(error){
                        console.log(response);
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