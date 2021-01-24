FROM node:14

WORKDIR /tmp 
RUN git clone https://github.com/opravil-jan/kikm-ppro.git app

RUN mkdir /usr/src/app && \ 
	apt-get update && apt-get install rsync -y && \
	rsync -rav /tmp/app/identity-api/ /usr/src/app/ && \
	rm -fr /tmp/app

WORKDIR /usr/src/app
RUN npm install && \ 
	npm install -g typescript && \
	tsc && \
	npm run migrate


CMD [ "node", "dist/src/index.js" ]
