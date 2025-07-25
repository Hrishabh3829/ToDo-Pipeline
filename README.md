# Todo Task Application with CI/CD Pipeline

A modern React-based Todo Task application with complete CI/CD pipeline implementation using Docker, Jenkins, and Kubernetes.

## 📋 CI/CD Pipeline Overview

This project implements a simple CI/CD pipeline that:

1. Stores code in GitHub
2. Uses Jenkins to build and test the code
3. Packages the app in Docker containers
4. Stores the container in Docker Hub
5. Deploys to Kubernetes
6. Runs a React + Vite Todo Task application

## 🚀 Getting Started

### Local Development

```bash
# Get the code
git clone https://github.com/Hrishabh3829/ToDo-Pipeline.git
cd ToDo-Pipeline

# Install dependencies
npm install

# Start development server
npm run dev

# Access the app at:
# http://localhost:5000/
```

### 🐳 Quick Docker Test

```bash
# Build image
docker build -t nigachu42/nodeapp:latest .

# Run container
docker run -d -p 8080:8080 nigachu42/nodeapp:latest

# Access app
# http://localhost:8080/
```

## 🔄 Simple CI/CD Setup Guide

### Step 1: Set up Jenkins

```bash
# Run Jenkins container with Docker support
docker run -u 0 --privileged --name jenkins -it -d -p 8080:8080 -p 50000:50000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
-v /home/jenkins_home:/var/jenkins_home \
jenkins/jenkins:latest

# Alternative one-line command
docker run -u 0 --privileged --name jenkins -it -d -p 8081:8080 -p 50000:50000 -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -v /home/jenkins_home:/var/jenkins_home jenkins/jenkins:latest

# Check if container is running
docker ps

# Get initial admin password
docker logs -f <container_id>

# Access Jenkins at:
# http://localhost:8080/
```

### Step 2: Configure Kubernetes

```bash
# Check Kubernetes configuration
cd ~
ls -la
cd .kube
ls
cat config

# Verify deployment status
kubectl get deployments
kubectl get svc
```

### Step 3: Set up Pipeline in Jenkins

1. Create a new Pipeline job in Jenkins
2. Add the following pipeline script:

```groovy
pipeline {
  environment {
    dockerimagename = "nigachu42/nodeapp"
    dockerImage = ""
  }

  agent any

  stages {
    stage('Checkout Source') {
      steps {
        git branch: 'main', url: 'https://github.com/Hrishabh3829/ToDo-Pipeline.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'dockerhublogin'
      }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
        }
      }
    }
  }
}
```

### Step 4: Access Your Application

```
# Local development access
http://localhost:5000/

# Kubernetes deployment access
http://<node-ip>:<nodePort>/
```

## 📦 Key Files

- **Dockerfile** - Builds the container image
- **deploymentservice.yml** - Kubernetes configuration
- **Jenkinsfile** - Pipeline definition

## 🛠️ Technologies

- React + Vite Todo application
- Docker for containerization
- Jenkins for CI/CD pipeline
- Kubernetes for deployment
- GitHub for version control
