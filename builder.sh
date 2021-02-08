#!/bin/bash
#On Ubuntu Saucy:
sudo add-apt-repository ppa:fkrull/deadsnakes
sudo apt-get update
sudo apt-get install python2.6
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.6 20
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.7 10

#you can switch between 2.6 & 2.7 using:
sudo update-alternatives --config python

#Btw I installed node using ppa:chris-lea/node.js