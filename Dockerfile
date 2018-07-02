FROM node:9

ADD ./fe /fe
WORKDIR /fe

RUN npm install
RUN npm run build
RUN npm install serve --g

EXPOSE 80

CMD ["serve", "-l",  "80", "dist/"]
