# Employee Manager

## Description
- This is a CLI application that can be used to manage a MySQL database of employees. 
- The application uses the NPM module Inquirer to ingest user inputs, MySQL2 to link to the database, and console.table to post to the command line. 

## How To Use
- Before installing, make sure you have MySQL installed on your computer. 
- First, clone the repository to your computer. 
- Once cloned, cd into the main directory and run
```bash
npm i
```
- This will install the node modules necessary to run the application. 
- Once the node modules are installed, make sure to set up the database using schema.sql.
- To accomplish this, cd into the db directory and enter MySQL in terminal. 
- Type
```bash
source schema.sql
```
- Then, seed the database with seeds.sql by typing
```bash
source seeds.sql
```
- Once the database is set up, exit MySQL and go back to the root directory. 
- Once in root, type the below in the command line
```bash
node index.js
```
- Once in the application, simply select the options you desire and the application will walk you through any necessary steps. Watch the video below if you need further instruction. 

## Link to Video of Application
https://drive.google.com/drive/u/0/folders/1SaOpN8m38PoU6096_TGg54a6LGlt4F4P



