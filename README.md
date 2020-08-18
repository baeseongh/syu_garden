# 삼육 정원사들 출석부
* DSC SYU에서 진행한 삼육 정원사들 (두유 노우 잔디?)출석부입니다.
* slack #commit 채널에 올라온 메시지들을 수집해서 출석부를 작성합니다.
* [Junho58](https://github.com/junho85/garden5)님의 정원사들5 출석부를 포크하여 작업하였습니다.
## 세팅 메뉴얼

### 1. 80port 종료(Linux)

해당 앱은 GCP 컴퓨트엔진 80포트에 실행된다. 컨테이너 재 실행시에는 기존의 80포트(아파치 이용)을 종료 시켜준 후 실행해야함.

```
sudo lsof -i :80
```

#80포트를 사용준인 apache2 PID확인 후 모두 종료시켜 준다.

```
sudo kill -9 "프로세스 번호(PID)"
```



### 2. Docker

**2.1 Garden_server(Shell)**

```
sudo docker exec -it garden_server /bin/sh
```

```
export VISUAL=vim; crontab -e
```

```
0 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * *  /usr/local/bin/python /app/attendance/cli_collect.py

0 0 * * *  /usr/local/bin/python /app/attendance/cli_noti_no_show.py

```

```
#5분단위 체크
0,5,10,15,20,25,30,35,40,45,50,55 * * * *  /usr/local/bin/python /app/attendance/cli_collect.py
```

```
cron
```

Server Stop & Start

```
sudo docker stop garden_server
sudo docker start garden_server
```



**2.2 Container_mongo(shell)**

Server Stop & Start

```
sudo docker stop container_mongo
sudo docker start container_mongo
```



```
sudo docker exec -it container_mongo bin/sh
```

create database & create collection

- use garden 하면 garden5 database 가 생성됩니다.

```
use garden5
```

- 현재 사용중인 DB드롭(use이후)

```
db.dropDatabase()
```

- slack message 들을 저장하는 collection 을 생성합니다.

```
db.createCollection("slack_messages")
db.slack_messages.createIndex({ts:1}, {unique: true})
```



CollectData API**

https://github.com/junho85/garden4/wiki/12.API

```
http://0.0.0.0:8000/collect/?start=2020-04-20&end=2020-04-22
```
