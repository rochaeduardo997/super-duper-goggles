FROM debian
MAINTAINER rochaeduardo997

ENV TZ=America/Fortaleza

WORKDIR /client

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install nodejs npm procps vim wget curl -y && \
    apt-get clean -y && \
    npm install npm@latest -g && \
    npm install @vue/cli -g 

ENTRYPOINT ["npm","run","serve"]
