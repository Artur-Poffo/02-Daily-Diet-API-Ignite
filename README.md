<h1 align="center">
  <a href="#">Daily Diet API | Ignite</a>
</h1>

<h3 align="center">
  A meals and diet API
</h3>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#api-routes">API Routes</a> • 
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> • 
 <a href="#author">Author</a>
</p>


## About

Daily Diet API - Second challenge of Ignite's updated Node.js trail, API that allows you to manage your meals

---

## Features

- [x] Sign Up
- [x] Sign In
  - [x] JWT Authentication
- [x] List all meals of a user
- [x] Filter one unique meal with ID
- [x] Add meals
- [x] Update meals
- [x] Delete meals
- [x] View your user metrics
- [x] Persist data in Postgres database with docker

---

## API Routes

- **_Users_**
  - **POST /users** - Create a new user
  - **POST /users/signin** - Sign in and generate JWT
  - **GET /users** - Get your user metrics **require a Bearer Token in the req's header**
- **_Meals - All routes require a Bearer Token in the req's header_**
  - **GET /meals** - List all meals of your user
  - **GET /meals/:id** - See a specific meal of your user
  - **POST /meals** - Create a new meal
  - **PATCH /meals/:id** - Update one of yours meals
  - **DELETE /meals/:id** - Delete one of yours meals

---

## How it works

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/) and a REST client like [Insomnia](https://insomnia.rest/)

**it is very important that before running the project you configure the environment variables as indicated in the file: .env.example**

#### Run the app

```bash
# Clone this repository
$ git clone https://github.com/Artur-Poffo/02-Daily-Diet-API-Ignite.git

# Access the project folder cmd/terminal
$ cd 02-Daily-Diet-API-Ignite

# install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The server will start at port: 3333 - You can now test in Insomnia or another REST client: http://localhost:3333
```

---

## Tech Stack

The following tools were used in the construction of the project:

- **Node.js**
- **TypeScript**
- **tsx*
- **tsup*
- **Fastify*
- **bcrypt*
- **zod*
- **prisma*

> See the file  [package.json](https://github.com/Artur-Poffo/02-Daily-Diet-API-Ignite/blob/main/package.json)

---

## Author

- _**Artur Poffo - Developer**_

[![Linkedin Badge](https://img.shields.io/badge/-Artur-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/arturpoffo/)](https://www.linkedin.com/in/arturpoffo/)
[![Gmail Badge](https://img.shields.io/badge/-arturpoffop@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:arturpoffop@gmail.com)

---