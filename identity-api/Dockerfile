FROM node:14

WORKDIR /tmp 
RUN git clone https://github.com/opravil-jan/kikm-ppro.git app

RUN mdkir app && cp /tmp/app/identity-api/ /usr/src/app/ && rm -fr /tmp/app

WORKDIR /usr/src/app
RUN npm install && npm install -g typescript && tsc

CMD [ "node", "dist/src/index.js" ]
