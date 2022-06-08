[see all the APIs & microservices project](https://github.com/s-manguy/projects/tree/main/APIs-microservices)  

# Go fullstack

This project is taken from the excellent course [*Passez au fullstack avec node.js, Express et MongoDB*](https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb) written by Will Alexander and published on the OpenClassrooms platform.   
The main objective of this course is create an API to manage the CRUD of the products. That the reason why the [Angular frontend e-shop app](https://github.com/OpenClassrooms-Student-Center/go-fullstack-v3-fr) had already been written and supplied.

## Objectives
* Create a web server with Express.
* Crate an APIRestful with Node.js, Express and MongoDB.
* Create an authentication system using tokens on an Express app.
* Manage user files using multer on an Express app. 

Remark: the given frontend app does not respect the RWD rules.

## Result & Certification
* view the [certification](https://github.com/s-manguy/diploma/blob/main/WEB-DEVELOPPER/certificate-node-express-mongodb-6767157116.pdf)
* Screenshots:  
  []()  []()  []()  []()  []()

## Install the project
Clone/download this project.  

### Frontend app
* Install Angular: `npm install --g @angular/cli`
* Go to the just directory which has been cloned from https://github.com/OpenClassrooms-Student-Center/go-fullstack-fr-frontend.git : `cd frontend`
* Install all the dependencies: `npm install`
* Start the server: `ng serve`  

### Backend app
* Go the directory: `cd backend`
* Install all the dependencies: `npm install`
* Start the server: `node serve`  
* Do not forget to create your own MongoDB database.
* Do not forget to insert you your MongoDB database informations in the backend/app.js file!

### In the browser
* Go to `localhost:4200`
* Click on "part 4" which redirects to the finalized app. *Remark: part 1-2 and part3 will not run ! No need to spare time !*  
* Test the app:
  * Create a new user.
  * Log in.
  * Add a new product to sell.
  * Modify it.
  * Add a second product.
  * Delete it.
  * Log out.
* Remark: as you can see the frontend app display only an admin dashboard. It does not display a list of all the on sale objects from all the users !
