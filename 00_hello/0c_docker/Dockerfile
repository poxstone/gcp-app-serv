FROM node:10-alpine
MAINTAINER Oscar Ortiz <posxtone@gmail.com>

ENV APP_PATH='/home/node/app'
ENV APP_PORT=4000
ENV USER='node'

RUN mkdir -p $APP_PATH/node_modules && chown -R node:node $APP_PATH
WORKDIR $APP_PATH
COPY ./* ./

USER $USER
RUN npm install
COPY --chown=node:node . .

EXPOSE $APP_PORT

CMD [ "node", "index.js" ]
# docker build -t poxstone/sumaapp .
# docker run --rm -itp 4000:4000 poxstone/sumaapp