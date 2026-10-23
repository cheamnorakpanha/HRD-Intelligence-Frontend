// HRD Intelligence Web - CI pipeline
// Job type: Multibranch Pipeline (so BRANCH_NAME is set).
// Needs plugins: Pipeline, Docker Pipeline, Credentials Binding.
//
// DevOps: replace the values marked TODO.

pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    IMAGE_NAME          = 'hrd-intelligence-web'
    REGISTRY            = 'docker.io/your-org'             // TODO: your registry
    REGISTRY_CREDENTIAL = 'docker-registry-credentials'    // TODO: Jenkins credential ID
  }

  stages {

    stage('Quality checks') {
      agent {
        docker {
          image 'node:24-alpine'
          reuseNode true
        }
      }
      steps {
        sh 'npm ci'
        sh 'npm run lint'
        sh 'npm run format:check'
        sh 'npx tsc --noEmit'
      }
    }

    stage('Build image') {
      when { anyOf { branch 'main'; branch 'develop' } }
      steps {
        script {
          // develop -> staging, main -> production
          def apiUrl = (env.BRANCH_NAME == 'main')
            ? 'https://api.hrd.example.com'          // TODO: production API Gateway
            : 'https://api-staging.hrd.example.com'  // TODO: staging API Gateway

          env.IMAGE_TAG = "${env.BRANCH_NAME}-${env.GIT_COMMIT.take(7)}"

          sh """
            docker build \
              --build-arg NEXT_PUBLIC_API_BASE_URL=${apiUrl} \
              -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
              -t ${REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}-latest \
              .
          """
        }
      }
    }

    stage('Push image') {
      when { anyOf { branch 'main'; branch 'develop' } }
      steps {
        withCredentials([usernamePassword(
          credentialsId: env.REGISTRY_CREDENTIAL,
          usernameVariable: 'REG_USER',
          passwordVariable: 'REG_PASS'
        )]) {
          sh '''
            echo "$REG_PASS" | docker login "${REGISTRY%%/*}" -u "$REG_USER" --password-stdin
            docker push "$REGISTRY/$IMAGE_NAME:$IMAGE_TAG"
            docker push "$REGISTRY/$IMAGE_NAME:$BRANCH_NAME-latest"
          '''
        }
      }
    }

    // TODO (DevOps): update the image tag in the Kubernetes manifest repo
    // so Argo CD deploys it.
  }

  post {
    always {
      sh 'docker logout || true'
      cleanWs()
    }
  }
}
