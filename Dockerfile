FROM node:9

ADD . /fe
WORKDIR /fe

RUN npm install
RUN npm run build
RUN npm install serve --g

EXPOSE 4000

CMD ["serve", "-l", "4000", "dist/"]
