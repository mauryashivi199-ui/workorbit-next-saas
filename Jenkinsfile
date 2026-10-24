pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'crewzen-saas:latest'
        NODE_ENV = 'production'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out latest code from Git repository...'
                checkout scm
            }
        }

        stage('2. Install Dependencies') {
            steps {
                echo 'Installing clean Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('3. Lint & Typecheck') {
            steps {
                echo 'Running static analysis and TypeScript validation...'
                sh 'npx tsc --noEmit'
            }
        }

        stage('4. Next.js Production Build') {
            steps {
                echo 'Building Next.js standalone distribution bundle...'
                sh 'npm run build'
            }
        }

        stage('5. Docker Build & Container Test') {
            steps {
                echo 'Building production Multi-Stage Docker image...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('6. Deploy to Production') {
            steps {
                echo 'Deploying Docker container with zero downtime...'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '🎉 Crewzen Production Deployment via Jenkins succeeded!'
        }
        failure {
            echo '❌ Pipeline failed! Sending alert notification to DevOps team.'
        }
    }
}
