# Welcome to PMS

## What's PMS?

It is an abbreviation for Product Mangement System.

## Requirements

	* NodeJS v8.4.0
	* MongoDB v3.4.7
	
## Getting Started

Clone the project and install dependencies

	$ git clone git@github.com:PirunSeng/pms.git
	$ cd pms
	$ npm install

Start MongoDB service by using `mongod` command for Mac users.

	$ mongod
	
Then create database and collections. For Mac users, we use `mongo` command to login to the db. Open another ternimal tab, and type:
	
	$ mongo
	> use db_name;
	> db.createCollection("products");
	
## We're ready to go

Start the server by

	$ npm start

Navigate to `http://localhost:3000` and you're all done. Enjoy!
