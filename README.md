# School administration system

## Prerequisites
- NodeJS v12.18.3
- Docker

<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | external | dir | This holds the code for building external system which is required for question 2.<br><b>There is no need to modify anything inside or start it manually</b>
| 2 | javascript | dir | This holds the base code which you should extend in order to fulfil the requirements |
| 3 | README.md | file | This file |
| 4 | data.sample.csv | file | Sample csv for question 1 |
| 5 | school-administration-system.postman_collection_v0.1.json | file | Postman script for all the API endpoints |

<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 3306 |
| 2 | external | 5000 |
| 3 | applicaiton | 3000 |


<br>

## Commands
All the commands listed should be ran in ./javascript directory.

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database and external (folder).
```bash
npm start
```
<br>


<br>

### Running unit tests
This will execute the unit test cases.
```bash
npm run test
```

<br>

### Check local application is started
To check the application status, access the following endpoint, and would get a 200 response idf it is running

```
http://localhost:3000/api/healthcheck
```

<br>



<br>

## Extras

### Database
Database migration scripts are placed in javascript/database folder. <br>
It will be ran the first time MySQL docker container is first initialised. <br><br>

<br>

## FAQ

### Error when starting up
If you encounter the following error when running ```npm start```, it is due to the slow startup of your database container.<br>
Please run ```npm start``` again.

```
[server.js]	ERROR	SequelizeConnectionError: Connection lost: The server closed the connection.
[server.js]	ERROR	Unable to start application
```

<br>

### How do I upload file to /api/upload?
All the api endpoints can be accessed using the included postman script (school-administration-system.postman_collection.json_v0.1).
