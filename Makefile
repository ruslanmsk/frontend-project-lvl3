install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

deploy:
	git push heroku master