FROM node:20-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

# Install ALL dependencies including nodemon
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
