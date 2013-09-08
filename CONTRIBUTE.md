# Contributing
Feel free to contribute to this project and help it grow.

## Author
- [Mark Goodyear](https://github.com/markgoodyear)

## Bugs
If you find any bugs, please add them to the issues on the GitHub page and give any examples if possible.

## Features
Please log any feature requests in the issues, or create a pull request if you have added the feature in.

## Directory Structure
Project files and folder structure.

* css/ - CSS for plugin and demo site
* js/
** dist/ - Distribution files
** src/ - The plugin source which Grunt builds from
** lib/ - Any libraries used

## NodeJS and Grunt
This project uses [Node JS](http://nodejs.org/) and [Grunt](http://gruntjs.com/).

Once installed, use `npm install` in the project directory to install the required dependancies. This will create a `node_modules` folder with the dependancies. Please do not add this folder to Git.

When contributing, use the `js/src/populatr.js` file and run the Grunt tasks to complile the distribution files.

## Grunt tasks
Included Grunt tasks for scrollUp:

* grunt clean
* grunt jslint - lints the src/jquery.scrollUp.js file
* grunt conact - creates the distribution (js/jquery.scrollUp.js) file
* grunt uglify - creates the minified version in js/*

Use `grunt` to run all tasks together.
