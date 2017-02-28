FROM node:4.2.2

ENV KUBECTL_PATH=/bin/kube-ctl
ENV CONFIG_FILE_PATH=/config

RUN cd $KUBECTL_PATH && \
    curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && \
    chmod +x ./kubectl


ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install
ADD . /app

CMD npm start
