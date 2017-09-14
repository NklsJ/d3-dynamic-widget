# D3DynamicWidget

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## What it does?

You can use datepicker fields to filter mock data and present it in a dynamic d3 widget.

Mock data consists of JSON array of `Event` objects. ( Example `{'id': 1, 'date':  '2017-02-17', 'valueSelected': 0}` ) 

Widget calculates the amount of all Events on a requested timespan and compares that value to the number of Events that have `'valueSelected': 1`.

## Requirements

- Angular CLI
- Node.js
- npm

## Installation & running the demo

Download and install Node.js and npm https://docs.npmjs.com/getting-started/installing-node

Download and install angular-cli https://cli.angular.io/

Clone this Github repo to your own computer.

cd into the project folder.

Run `npm install`

Run `ng serve --open` OR run `npm start` and navigate to http://localhost:4200/
