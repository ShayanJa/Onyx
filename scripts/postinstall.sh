#!/bin/bash

# Install rn-nodeify to be able to use Node.js libs.
npm i rn-nodeify -g
sh ./node_modules/.bin/rn-nodeify --install buffer,events,process,stream,util,inherits,fs,path --hack

#Fix problem with glog dependencies
cd ./node_modules/react-native/third-party/glog-0.3.4
./configure
make
make install

# react-native link react-native-randombytes