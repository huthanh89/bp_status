pipeline {
	agent any
	stages {
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