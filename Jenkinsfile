pipeline {
	agent any
	stages {
		stage ('sanity') {
			steps {
                echo "hello from buiild"
                sh "ls -lat"
			}
		}
		stage ('full regression2123') {
            when {
                branch "master"
            }
			steps {
                echo "hello from regression3"
			}
		}
	}
}