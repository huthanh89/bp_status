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
		stage ('sanity') {
			steps {
			    echo "hello from sanity"
			}
		}
		stage ('full regression2') {
			steps {
			    echo "hello from regression"
			}
		}
	}
}