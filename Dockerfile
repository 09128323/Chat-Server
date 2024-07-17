FROM node AS builder

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node

WORKDIR /src

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 9000

CMD ["node", "dist/main.js"]
