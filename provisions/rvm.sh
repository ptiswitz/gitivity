#!/bin/bash

echo "Install ruby with rvm..."
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s $1

source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.profile

echo "Select and set ruby version..."
rvm use --install --default $2

shift
shift

echo "Install ruby gems..."
if (( $# ))
then gem install $@
fi
