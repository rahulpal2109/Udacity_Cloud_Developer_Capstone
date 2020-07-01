# Cloud Capstone Project         
This repository is associated with Cloud Developer ND - Cloud Capstone Project.

# Notes Diary App - Diary to track our notes

## Overview
The purpose of the cloud developer capstone project is to give us a chance to combine what we've learned throughout the program. 

In this project, I've built a cloud-based application, and followed the principles of the Microservices course (course 3). This will demonstrate to potential employers and colleagues that I can independently create and deploy applications using these principles.
* “user” - allows users to register and log into a web client, CRUD operations for DiaryApp diary records. (Update/Delete is planned for completion later)
* “frontend” - acts as an interface between the user and the backend-services
* "reverseproxy" - For resolving multiple services running on same port in separate containers. Not required currently but added for future purpose in case we have other backend services running on same port.

Correspondingly, the project is split into following parts:
1. The RestAPI User Backend, a Node-Express user microservice.
1. The Simple Frontend - A basic Ionic client web application which consumes the RestAPI Backend.
1. Nginx as a reverse-proxy server, when different backend services are running on the same port, then a reverse proxy server directs client requests to the appropriate backend server and retrieves resources on behalf of the client.  


## Steps taken to complete the project:

### 1. Set up infrastructure:
Infra here has 3 parts - 
 * <b>Local development infra:</b>
    1. Installing Node and NPM
        
        This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/). Verify the installation of Node.js using following command in your "terminal" / "cmd": 
        ```
        node -v
        v12.16.3
        ```
        Verify the installation of NPM and update: 
        ```
        npm -v
        v6.14.4
        ```
    2. How to Install project dependencies using NPM
  
        This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
        ```bash
        npm install
        ```
        >_tip_: **npm i** is shorthand for **npm install**

    3. Installing Ionic Cli
      
        The Ionic Command Line Interface is required to serve and build the frontend. Instructions for installing the CLI can be found in the [Ionic Framework Docs](https://ionicframework.com/docs/installation/cli). When we would configure and start the backend services, then the frontend server can be started using following command in the terminal:
  
        ```bash
        ionic serve
        ```
        > _tip_: this frontend is designed to work with the RestAPI backends. It is recommended you stand up the backend first, test using Postman, and then the frontend should integrate.
        
    4. Docker
       
       I've setup docker in my Ubuntu machine and used it to create images and run containers.
       
       Refer to official documentation: https://docs.docker.com/engine/install/ubuntu/
       
    5. Postbird
    
       I've installed Postbird PostgreSQL GUI Client to access my RDS instance.
       Refer to doc: https://www.electronjs.org/apps/postbird
               
 
 * <b>AWS infra:</b>
    1. AWS account:
       
       I have created an AWS account.
    1. AWS RDS - PostgreSQL instance
       
       I have set up an AWS RDS instance for PostgreSQL. Refer to this: https://aws.amazon.com/getting-started/tutorials/create-connect-postgresql-db/
       
    2. AWS EKS:
        
        I have setup a K8s cluster using AWS Elastic Kubernetes Service and provisioned 2 nodes in the Node Group.
        Refer to this: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html 
       
 * <b>External Resources:</b>
    1. DockerHub: 
        
        I've created a DockerHub account as a repo for my docker images.
    
    2. TravisCI:
      
        I have used TravisCI as my CI tool. I have integrated it with my GitHub account so that it can look for changes and automatically start builds.
        
        I've configured a .travis.yml file in the root dir of my project which Travis CI uses as config.
         

### 2. Create the application using microservices architecture
 Created the following services:
 
 * reverseproxy (deployment) 
 * frontend 
 * user 
 
 
 ![Alt text](/images/microservice.PNG "Microservice")
 
### 2. Build and run apps locally:
 Executed the following and ran the backend user application in local:
 ```
  npm i
  npm run build
  npm run dev
 ```
 ![Alt text](/images/backend-local-run.PNG "npm local")
 
 Executed the following and ran the frontend application in local:
  ```
   npm i
   ionic serve
  ```
 ![Alt text](/images/frontend-local-run.PNG "npm local")
 
### 3. Build Docker Images and push to dockerhub:
 ```$xslt
docker -v

docker build -t diaryapp-restapi-user .

docker images

docker run --rm --publish 8080:8080 -v $HOME/.aws:/root/.aws --env POSTGRESS_HOST=$POSTGRESS_HOST --env POSTGRESS_USERNAME=$POSTGRESS_USERNAME --env POSTGRESS_PASSWORD=$POSTGRESS_PASSWORD --env POSTGRESS_DB=$POSTGRESS_DB --env AWS_PROFILE=$AWS_PROFILE --env JWT_SECRET=$JWT_SECRET --name user diaryapp-restapi-user

```
![Alt text](/images/docker-images.PNG "docker images")

![Alt text](/images/docker-run-local.PNG "docker run local")


```$xslt
docker-compose -f docker/docker-compose-build.yaml build
docker-compose up
```
![Alt text](/images/docker-compose1.PNG "docker compose")

![Alt text](/images/docker-compose-up.PNG "docker compose up")


```$xslt
docker push rahulpal210991/diaryapp-restapi-user
```

![Alt text](/images/dockerhub.PNG "docker hub")


<br>

### 4. Setup Kubernetes Cluser and Node Groups:

![Alt text](/images/EKS.PNG "EKS")

```$xslt
aws eks --region ap-south-1 update-kubeconfig --name udacity-tinny-udagram-k8s
kubectl get nodes
kubectl cluster-info
```
![Alt text](/images/cluster.PNG "EKS Cluster Info")

<br>

### 5. Deploy DiaryApp in K8s:

```$xslt
kubectl apply -f env-secret.yaml
kubectl apply -f env-configmap.yaml
kubectl get secrets
kubectl describe secret env-secret
kubectl get configmap
```
![Alt text](/images/eks-config.PNG "EKS Config")

```$xslt
kubectl apply -f backend-user-deployment.yaml 

kubectl apply -f frontend-deployment.yaml 

kubectl apply -f reverseproxy-deployment.yaml

kubectl get pods

kubectl get rs

kubectl get deployments
```

![Alt text](/images/kubectl-deployment.PNG "deployment")

```
kubectl apply -f backend-user-service.yaml

kubectl apply -f frontend-service.yaml

kubectl apply -f reverseproxy-service.yaml

kubectl get services

```

![Alt text](/images/kubectl-info.PNG "kubectl info")

<br>

### 6. Rolling update in k8s:

We change the version of our app and deploy it to k8s.

We see that old pods get removed from the replica set and new pods get created in a new replica set. Finally, old replica set has 0 pods in it. 

![Alt text](/images/rolling-deploy.PNG "Rolling Update")

<br>

### 7. Setup Amazon EKS Control Plane Logging using Cloudwatch :

Amazon EKS control plane logging provides audit and diagnostic logs directly from the Amazon EKS control plane to CloudWatch Logs in the account. We can select the exact log types you need, and logs are sent as log streams to a group for each Amazon EKS cluster in CloudWatch.

Refer to this doc: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html

Configure cloudwatch logs in EKS cluster:

![Alt text](/images/cloudwatch-config.PNG "Cloudwatch Config")

You can see logging is enabled in Logging tab of EKS Cluster:

![Alt text](/images/logging-enabled.PNG "Logging enabled")

Logs are seen in Logs Group tab of cloudwatch:

![Alt text](/images/cloudwatch-logs.PNG "Logs")



## Application:

Some screenshots of the application:

![Alt text](/images/diaryapp2.PNG "Application")

![Alt text](/images/diaryapp3.PNG "Application")

![Alt text](/images/diaryapp4.PNG "Application")

![Alt text](/images/diaryapp1.PNG "Application")

<br>

That's it folks!

I will keep working on this project and make it production ready in sometime.

Hope you like it ;)
