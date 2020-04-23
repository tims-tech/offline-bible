# Offline Bible
Bible mobile app.

Key app locations for development:
* [Anguler HTML files](https://github.com/tims-tech/offline-bible/tree/master/www/templates)
* [Anguler programming logic](https://github.com/tims-tech/offline-bible/tree/master/www/js)
* [The Bible text](https://github.com/tims-tech/offline-bible/tree/master/www/bible)


## Synopsis

This is an open source mobile Bible app. This app should give users an easy way of accessing the bible on their mobile device. It should not require a login or access the internet in order for it to work. The current supported Bible translation of this app is King James Version (KJV).

## Motivation

There are plenty of Bible apps out there but very few give [the message of salvation](https://github.com/tims-tech/offline-bible/blob/master/www/templates/tab-salvation.html) or a guide to the Bible verses that give it. The motivation behind this was app is to give message of salvation and present the Word of God.

## In the app store

Currently this is only in the android app store but this app can easily be ported over to many other platforms.

[Link to the app in android app store.](https://play.google.com/store/apps/details?id=com.ionicframework.offlinebible917390&hl=en)

## Tests

There are no tests yet..

## Contributors

For all those who want to contribute to this repo. Please know you do not need to be a programmer to contribute to this app. We still need new logos, icons, splash screens, new bible translations… So if you have the skill this app needs it!

For coders - Please note all code should be well tested, written and organized using as much common sense as possible. Please do not try to commit a bunch of spaghetti code with no comments on what the code does or how to use it.

The tools used to build this app are ionic framework, Cordova, angular, angular UI router and node.js. The core language is JavaScript.

**To set up the dev environment.**

1. Download and install node.js https://nodejs.org/
2. Make sure your command line/terminal is set up to use node.js with NPM. I.e. check environment variables.
3. While in the command line/terminal install ionic and Cordova using the following command
```
    npm install -g cordova ionic
```

**Look at the ionic documentation for clarification how to use the ionic.**

* [Ionic CLI](http://ionicframework.com/docs/cli/)
* [Ionic documentation](http://ionicframework.com/docs/)

**Some common cmd/terminal commands**
```
    ionic platform add android
    ionic build android
    ionic emulate android
```
use the below in the command line to test project out in a web browser
```
ionic serve
```

###### The Future

* The app design needs a lot of work.
* The app should have more than just one translation.
* Text highlighting or memory verse flash card would be cool.
* Maybe a name change from Offline Bible.

