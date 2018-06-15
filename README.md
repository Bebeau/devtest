# Smith & Crown Developer Test

This is a developer test that I've taken as a skills assessment for Smith & Crown.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have Nodejs on your machine.

* [Nodejs](https://nodejs.org/en/download/)

### Installing

Installation is easy for this project. Simply clone the repo to your local machine. Navigate to the working folder in command line.

Run this command to install dependent node modules.

```
npm install
```

You will need to generate a personal access token through your GitHub account to allow for API access. Follow the link below, click on the personal access tokens tab, and click the buttn to the right that says generate new token.

* [GitHub Personal Access Token](https://github.com/settings/tokens)

Open the App.js file and add the access token to the constant defined as accessToken on line 5.

```
const accessToken = "PasteYourTokenHere";
```

Then, start the app.
```
npm start
```

The app should launch in your browser.

## Deployment

In order to deploy a live build, run...

```
npm run-script build
```
Then, move the contents of the build folder output to the live server.

## Authors

* **Kyle Bebeau** - [The INiT Group](http://theinitgroup.com)

## Acknowledgments

* Hats off to [xuopled](https://github.com/xuopled) for the use of [react-svg-line-chart](https://github.com/xuopled). We used it to display the 30 day line graphs of pricing as a design element.
