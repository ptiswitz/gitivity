#!/usr/bin/env bash

echo "Update os..."
apt-get update -y

echo "Install curl and git-core modules..."
apt-get install -y curl git-core
