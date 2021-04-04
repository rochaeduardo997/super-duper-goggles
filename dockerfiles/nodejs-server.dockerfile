FROM debian
MAINTAINER rochaeduardo997

ENV TZ=America/Fortaleza

WORKDIR /server

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install nodejs npm procps vim wget curl -y && \
    apt-get clean -y && \
    npm install npm@latest nodemon -g && \
    npm install --save knex express mysql2

CMD ["npm","install"]
CMD ["npm", "start"]
