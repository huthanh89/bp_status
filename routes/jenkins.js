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

// Translate Jenkins build status to Github check status.

const JenkinStatus = {
    SUCCESS: {
        status: 'success',
        description: 'Successful build.'
    },
    UNSTABLE: {
        status: 'error',
        description: 'Unstable build.'
    },
    ABORTED: {
        status: 'error',
        description: 'Build was aborted.'
    },
    FAILURE: {
        status: 'failure',
        description: 'Build error occured.'
    },
    NOT_BUILT: {
        status: 'pending',
        description: 'Waiting for build to start.'
    }
}

//=============================================================================//
// POST
//=============================================================================//

router.post('/', function (req, res) {

    let build = req.body.build;
    let phase = build.phase;
    let status = build.status;
    let sha = build.parameters.SHA;

    // TODO: Add more events in the following phases:
    // QUEUED, STARTED, COMPLETED, FINALIZED

    if (phase == "COMPLETED") {
        Config.ghrepo.status(sha, {
            "state": JenkinStatus[status].status,
            "target_url": "http://ci.mycompany.com/job/hub/3",
            "context": "Sanity Check",
            "description": JenkinStatus[status].description
        }, function () {
            console.log("Updated Github status check.")
        });

    }

    // If hook is not a pull request then exit.

    res.sendStatus('200')

})

//=============================================================================//
// Export
//=============================================================================//

module.exports = router;

//=============================================================================//