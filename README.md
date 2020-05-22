# General



## Remember to add to global .gitignore before uplaoding!



## Also remember to add to the global ReadMe if you wish to do so.



# Vue frontend ReadMe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## To run the project: Run www on backend, and nodejs serve on frontend. 



# Backend ReadMe

## Necessary libs

### MongoDB
Download [MongoDB V4.x](https://www.mongodb.com/download-center/community). \
MongoDB Compass not required.

### NodeJS
Download [Node.js LTS](https://nodejs.org/). \
NodeJS Chocolatey not required.

## Project Setup
```
npm install
```

### Create .env file
```
cp env.template .env
```

Then enter your credentials in the newly created .env file.

### How to Create Configuration for backend
CONFIG INCLUDED IN LATEST EDITION! \
\
Top right, press "Add Configuration...". Create a new Node.js config. \
Set "Working directory" as '~\ibmmab\backend.' \
Set "JavaScript file:" as 'bin\www' \
Set "Environment variables:" as 'DEBUG=backend:*' \
\
Optional \
Browser/Live Edit -> Open browser. \
Enable open browser after launch, with URL:'http://localhost:3000/'

## API Syntax

### DB Request/GET API ALL IBM Document Entries Syntax
```
http://localhost:3000/api/ibmData
```
### DB Request/GET API IBM Document Specific DB Syntax (' not included)
```
http://localhost:3000/api/ibmData?query='query'
```

### DB Request/GET API ALL DB Entries Syntax
```
http://localhost:3000/api/anData
```

### DB Request/GET API Specific DB Syntax (' not included)
```
http://localhost:3000/api/anData?title='title'&author='authorName'
```

### DB SET API via URL (' not included)
```
http://localhost:3000/api/anData/add?text='text'&title='title'&author='authorName'&url='url'&scrape_date='dateFormat-yyy-mm-dd'
```
Copy-paste-able:
```
http://localhost:3000/api/anData/add?text=&title=&author=&url=&scrape_date=
```

### DB SET API Manually/via HTML
Go to http://localhost:3000/ it is on the index page.



# Scraper ReadMe

## Setup

## Python

Download [Python 3.8.x](https://www.python.org/downloads/ ).

### You must check the button to add path in the installer

Set the project interpreter to virtual env python 3.8.x with path* in your IDE. \
Path should be
```
 C:\Users\"YourUsernameHere"\AppData\Local\Programs\Python\Python38
```
from the installation

## Pip

Run this to install all requirement
```
pip install -r requirements.txt
```

