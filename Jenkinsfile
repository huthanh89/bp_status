pipeline {
	agent any
	stages {
		stage ('build') {
			steps {
			   	scmInfo = checkout scm
				echo "scm : ${scmInfo}"
				echo "${scmInfo.GIT_COMMIT}"
				echo "hello from buiild"
			}
		}
		stage ('sanity') {
			steps {
			    echo "hello from sanity"
			}
		}
		stage ('full regression2') {
			steps {
			    echo "hello from regression3"
			}
		}
	}
}
