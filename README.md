# Naqi Todo Apps

Naqi todo apps is a simple application for you to create your own todo list anytime and anywhere using facebook login

### Routes

User :

| Route | HTTP | Description |
| ----- | ---- | ----------- |
| /users/login | POST | Create profile data (if not exists) and get token |
| /users/:id | GET | Get profile data (name, email, idFacebook, gender, age, picture, role) |
| /users/ | GET | Get all data users (admin only) |

Todo :

| Route | HTTP | Description |
| ----- | ---- | ----------- |
| /todos/add | POST | Create a todo list (body : name, dueDate // default : createdAt = new Date, status = false) by passing an authentication's token in middleware |
| /todos/ | GET | Get all todo lists (name, createdAt, dueDate, status) by passing an authentication's token in middleware |
| /todos/completed | GET | Get all completed (status = true) todo lists by passing an authentication's token in middleware |
| /todos/uncompleted | GET | Get all incompleted (status = false) todo lists by passing an authentication's token in middleware |
| /todos/?todo_name | GET | Get list of todos request query search by todo's name |
| /todos/:id | PUT | Update or edit a todo list by request params id |
| /todos/:id/checklist | PUT | Upate a status false or true |
| /todos/:id | DELETE | Delete a specific todo list by request params id|

### Installation and Usage

Naqi Todo Apps requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd To-Do-Fancy-API/server
$ npm install
$ npm run dev || node ./bin/www
```

Install npm live-server globaly and start the client.

```sh
$ cd To-Do-Fancy-API/client
$ npm install -g live-server
$ live-server
```

### Jsonwebtoken Key
You need to use your free permission jwt key for decode or sign jsonwebtoken by create .dotenv file and write 'SECRET_KEY=//yourkey//'

for example in your .dotenv file:
```sh
SECRET_KEY=123409253628
```
