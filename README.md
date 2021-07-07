Adjust for current versions

1) export DOCKERID=sm9l
2) docker build . -t $DOCKERID/josephwitten.com:1.3 
3) docker run -d -p 80:80 --name webServer $DOCKERID/josephwitten.com:1.3 
