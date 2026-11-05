install:
	npm ci
build:
	rm -rf dist
	npm run build
start:
	make start-backend

start-backend:
	npx start-server -s ./dist                