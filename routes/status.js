//=============================================================================//
// Imports
//=============================================================================//

const express = require('express');
const _ = require('lodash');
const github = require('octonode');
const request = require('request');

const router = express.Router();

//=============================================================================//
// Variables
//=============================================================================//

const client = github.client('67f15a111c350e61ad5e5173dec2696473d168e7');
const ghrepo = client.repo('huthanh89/practice_jenkins');
const jenkins_token = 'myaccesstoken'
const jenkins_username = 'thanhhuynh'
const jenkins_password = 'huynh'
const whitelist_branches = ['featureC']

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
    
            // Update GitHub status check to pending.
            // Parse for pull request committed SHA.
            
            let sha = payload.pull_request.head.sha;
            sha = JSON.stringify(sha).replace(/"/g, "")
            
            // Parse for branch name.

            let branch = payload.pull_request.base.ref;
            branch = JSON.stringify(branch).replace(/"/g, "")

            if(whitelist_branches.includes(branch)) {
        
                ghrepo.status(sha, {
                    "state": "pending",
                    "target_url": "http://ci.mycompany.com/job/hub/3",
                    "context": "Sanity Check",
                    "description": "Waiting for sanity result"
                }, function () {
                    console.log("Updated Github status check.")
                });
        
                // Trigger Jenkins build.
        
                let job_api = `http://ec2-18-206-252-202.compute-1.amazonaws.com:8080/job/practice_jenkins/buildWithParameters?token=${jenkins_token}&SHA=${sha}`
        
                request(job_api, {
                    method: "POST",
                    auth: {
                        user: jenkins_username,
                        pass: jenkins_password
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