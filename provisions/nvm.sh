#!/bin/bash

echo "Install nodejs with nvm..."
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

source ~/.nvm/nvm.sh
echo "source ~/.nvm/nvm.sh" >> ~/.profile

echo "Select and set nodejs version..."
nvm install $1
nvm alias default $1

shift

echo "Install node packages..."
if (( $# ))
then npm install -g $@
fi
