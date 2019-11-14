FROM node:latest

WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]
