# elasticsearch-crossbar
**Edit elasticsearch.yml file to permit remote access from outside and add this lines at the end of the file:
************************
transport.host: localhost 
transport.tcp.port: 9300 
http.port: 9200
network.host: 0.0.0.0
***********************

1 - build a image with using of DockerFile:
sudo docker build . -t iot_container
2- launch the crossbar container:
 sudo docker run -u 0 --rm --name=crossbar -e CBURL="ws://localhost:8080/ws" -e CBREALM="realm1" -it -p 8080:8080 iot_container
3- launch publisher client (python):
sudo docker run -v $PWD:/app -e CBURL="ws://crossbar:8080/ws" -e CBREALM="realm1" --link=crossbar --rm -it crossbario/autobahn-python:cpy3 python /app/client/publisher.py
