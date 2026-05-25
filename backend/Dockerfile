FROM node:20-alpine

WORKDIR /app

COPY package*.josn ./

RUN npm install

COPY . .

RUN npm run dev

CMD ["npm", "run", "dev", "--", "--host"]
