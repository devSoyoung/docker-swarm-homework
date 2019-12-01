# Service
만들고자 하는 전체 애플리케이션을 이루는 각각의 micro service를 구성한다.
* **데이터베이스 서버** : mysql
* **백엔드 서버** : node.js의 koa
* **프론트엔드 서버** : 따로 두고 싶었는데 빨리 과제 내야해서 일단 api 서버에서 그냥 바로 준다.

이렇게 세 가지로 구성된다.

## Database Server
* mysql:5.7 이미지를 사용한다.
* 루트 로그인 정보나 사용자, 사용자 로그인 정보, 데이터베이스는 environment에서 관리한다.

## Backend Server
koa 프레임워크로 만들어진 API 서버

### 로컬에서 돌려보기
```
$ docker run --name myapiserver -p 80:3000 api_server:latest
```

* `myapiserver` 라는 이름으로 컨테이너를 생성
* 컨테이너의 3000번 포트를 호스트의 80 포트와 연결
* api_server:latest 라는 이미지로 컨테이너를 실행

```
# 빌드된 이미지 확인하기(아래 두 가지 동일한 결과)
$ docker images
$ docker image ls

# 실행중인 모든 컨테이너 종료
$ docker container kill $(docker container ls -aq)

# 모든 컨테이너 삭제
$ docker container rm $(docker container ls -aq)
```

### Frontend
프론트엔드 코드는 `frontend_server/frontend`에 있다. 여기서 `npm run build` 하면 빌드된 결과물이 `build` 폴더에 생긴다. 그걸 backend_server 폴더의 public 으로 옮겨야한다. 귀찮다..

### 이미지 빌드하고 Docker Hub에 올리기 
```
$ docker build -t csylee113/api_server .
$ docker push csylee113/api_server:latest
```
`api_server` 라는 이름으로 Dockerfile을 빌드해서 API 서버 이미지를 생성 (latest 태그가 붙음)

*** 
# Swarm

## Make Docker Machine
```
$ docker-machine create --driver virtualbox manager
$ docker-machine create --driver virtualbox worker1
$ docker-machine create --driver virtualbox worker2
```

manager, worker1, worker2 docker-machine을 생성

## Organize Swarm 
### Manager 노드 지정                                             
```
$ docker-machine ssh manager \
> docker swarm init —advertise-addr $(docker-machine ip manager)
```

```
$ docker-machine ssh manager \
> docker node ls

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
jfb03c4afg469ghfpgb6z2s7s *   manager             Ready               Active              Leader              19.03.4
```
ssh로 manager 머신에 접속해서 node의 목록을 확인하는 명령어를 수행하면 아직 Manager 노드밖에 없다. 아까 위의 커맨드를 실행하면 아래와 같은 결과가 뜬다.

```
Swarm initialized: current node (jfb03c4afg469ghfpgb6z2s7s) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-1mye1mfankrlllmea0ya80fmcrgd3lpp1qwg4bx6zjeipsiuhk-2qkcbka60pq2tfewizuzg9fdh 192.168.99.103:2377

To add a manager to this swarm, run ‘docker swarm join-token manager’ and follow the instructions.
```

여기에서 docker swarm 부터 2377까지 복사해서 워커 노드로 만들어줄 worker1, worker2 머신에 각각 실행한다.

### Worker 노드 정의하기
```
$ docker-machine ssh worker1 \
docker swarm join —token SWMTKN-1-1mye1mfankrlllmea0ya80fmcrgd3lpp1qwg4bx6zjeipsiuhk-2qkcbka60pq2tfewizuzg9fdh 192.168.99.103:2377

This node joined a swarm as a worker.
```

다시 manager 노드에서 node ls를 실행해보면,

```
$ docker-machine ssh manager \
docker node ls

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
jfb03c4afg469ghfpgb6z2s7s *   manager             Ready               Active              Leader              19.03.4
k6mj3fz2tchb10labqkcg0niz     worker1             Ready               Active                                  19.03.4
43n37mg41drdxkafbdatevtsx     worker2             Ready               Active                                  19.03.4
```
아래와 같이 swarm manager와 worker에 대한 정보를 확인할 수 있. 

> `docker node`는 swarm manager에서만 실행할 수 있는 명령어이다. swarm manager가 아닌 worker1이나 worker2에서 해당 명령어를 실행하면 아래와 같이 에러가 발생함.

```
$ docker-machine ssh worker1 \
> docker node ls

Error response from daemon: This node is not a swarm manager. Worker nodes can't be used to view or modify cluster state. Please run this command on a manager node or promote the current node to a manager.
exit status 1
```

***

## Task Deployment

```
# docker-compose.yml을 machine으로 복사
$ docker-machine scp docker-compose.yml manager:~

# Manager를 통해 application stack을 deploy
$ docker-machine ssh manager docker stack deploy -c docker-compose.yml helloswarm

# Manager 노드에서 서비스 확인
$ docker-machine ssh manager docker service ls
$ docker-machine ssh manager docker service ps helloswarm
$ docker-machine ssh manager docker service ps helloswarm_webserver
```

## 결과 확인하기
master 노드의 ip를 확인하고 브라우저에서 해당 ip의 80포트(브라우저 기본)로 접속하면 잘 뜬다.

```
$ docker-machine ip manager
```

## Release Node(종료하기)
먼저 manager에서 `stack rm`으로 만들었던 서비스를 종료한다.
```
$ docker-machine ssh manager docker stack rm helloswarm
```

swarm으로부터 worker node를 해제하는 것은 다음 명령어.

```
# worker node 해제
$ docker-machine ssh worker1 docker swarm leave

# manager node 해제
$ docker-machine ssh manager docker swarm leaver --force
```

manager 노드를 해제 할 경우에는 --force 옵션을 주어야 한다.

***

## 부록

### ERROR: docker-compose.yml에서 build 시도

> Note: This option is ignored when deploying a stack in swarm mode with a (version 3) Compose file. The docker stack command accepts only pre-built images.

swarm 모드에서의 compose file에서는 pre-built 이미지만 허용됨

```
# api_server 디렉토리에서 이미지를 빌드하고 Docker Hub에 푸시함
$ cd api_server
$ docker build -t csylee113/api_server .
$ docker push csylee113/api_server:latest
```

