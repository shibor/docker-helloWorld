# 使用轻量级 Node.js 镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制应用文件
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "app.js"]