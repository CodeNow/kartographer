FROM node:4.2.2

ENV KUBECTL_PATH=/bin/kube-ctl
ENV CONFIG_FILE_PATH=/config

ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install
ADD . /app

CMD npm start
