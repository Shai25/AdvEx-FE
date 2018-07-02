FROM node:9

ADD . /fe
WORKDIR /fe

RUN npm install
RUN npm run build
RUN npm install serve --g

EXPOSE 5000

CMD ["serve", "dist/"]
