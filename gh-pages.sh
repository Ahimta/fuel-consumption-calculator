#!/bin/env sh
git checkout -B gh-pages HEAD

gulp build

git add --force --all dist/

git commit -am "Deploy to gh-pages"
git push --force "https://github.com/Ahimta/fuel-consumption-calculator.git" `git subtree split --prefix dist gh-pages`:gh-pages

git checkout master
