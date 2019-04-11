pipeline {
	agent any
	stages {
		stage ('build') {
			steps {
		        git branch: 'master',
                    url: 'https://github.com/huthanh89/practice_jenkins.git',
                    credentialsId: '426aa59a-070d-4683-bee9-6b37c68db4e5'
			    echo "hello from buiild"
			    sh "ls -lat"
			}
		}
        stage ('status check') {
			steps {
                githubNotify account: 'huthanh89', context: 'Final Test', credentialsId: '426aa59a-070d-4683-bee9-6b37c68db4e5',
                    description: 'This is an example', repo: 'bp_status', sha: '6770d88c8ccd189dd7280ee5c04b16585f73d50b', 
                    status: 'SUCCESS', targetUrl: 'http://www.cloudbees.com'
			}
		}
		stage ('sanity') {
            when {
                branch "featureA"
            }
			steps {
			    echo "hello from sanity"
			}
		}
		stage ('full regression2') {
            when {
                branch "master"
            }
			steps {
                echo "hello from regression3"
			}
		}
	}
}