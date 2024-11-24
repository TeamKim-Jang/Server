FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y iputils-ping

COPY . .

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]