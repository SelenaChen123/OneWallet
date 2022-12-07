<p align="center">
<img width="350" src="https://github.com/SelenaChen123/HackNC2022/blob/main/docs/project-header.svg">
</p>

-----

![WebApp-lightmode](https://github.com/SelenaChen123/HackNC2022/blob/main/docs/webpage-lightmode.png)

![WebApp-darkmode](https://github.com/SelenaChen123/HackNC2022/blob/main/docs/webpage-darkmode.png)

<br />

-----

## 🚧 Prerequisites  

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

-----

## 💻 How to Run  

Run the following command to start the application:  
```bash
# Start multi-container app
$ docker-compose up -d
```

The web application can now be reached through: [localhost:3000](http://localhost:3000/).  

-----

## 🧹 Cleanup...  

To delete all the resources that have been created:  
```bash
# Stop and delete the containers and images
$ docker-compose down --rmi all
```
