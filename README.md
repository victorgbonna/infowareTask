# infowareTask
## About The Project
This is an one seller ecommerce API where admin users can add products while the customer users can order. 

#### Frameworks, tools and libraries used 

- Node Js - runtime environment
- Express - backend library
- Mongodb- dbms
- Mongoose- ORM library for mongodb 
- Nodemon- dev dependency for auto run incase of changes
- JsonWebToken- for authentication and authorization on the api routes 
- Dotenv- putting all your environmental variables in a .env file
- Chai and mocha - program testing. I did not have time to implement this.

### Getting started 
#### To get a local copy up and running follow these simple example steps
#### Installation

- Clone the repo
- npm install
- Your config file are alright, given that they have default values. The only setback is that you have to create a mongo db collection
- There will not be a problem If you have mongo db atlas installed. A collection would be created automatically by default. You can create a collection online via the mongodb -  atlas [Web site](https://cloud.mongodb.com/) if you don't have it installed.

### Map 
###### This would entail every file adn folder and it's uses 
- Index.js - the main js page. It imports everything's then runs the app. 
- Config- both config and db js inside the config are for configurations and secret variables like the port, mongoose connection, token functionalities.
- Requests.res - for testing the apis(install restcient extension on your vscode to make use of it )
- Middleware - containing the token passing, verifies if the user is an admin so as to give him the authorization to make api calls
- Modules folder- contain the model and service file for the user and class module each
- Modules folder/../service.js- holds all the functionalities that will be called from the api
- Modules folder/../model.js- handling the mongoose schema 
- Api routes- this is where all the api endpoints are 

### There were 4 middlewares used for authorization in the routes with json web token being used.They are:-
- requiresAdmin(rA)- for admin routes only
- requiresAuth(rAu)- for users (both admin) only
- requiresCurrentUsers(rC)- for the user that is authenticated
- guestOnly(gO)- for non authenticated users only.

### There were applied below-
#### User routes- 
- post /api/user/add- for adding user(gO)
##### This will . Req.body should be like 
```javascript
{
  name:string,
  isAdmin:boolean,
  email:email regex,
  password:string
  gender:any one of ['male' 'female','others']
}
``` 
- post /api/user/add/admin- for adding admin
- post /api/user/login- for login(gO)
- get /api/user/logout- for logout(rAu)
- get /api/user/:id - get user by id as request params (rC)
- get /api/user/all/users- get users. it returns everything by default but you can set the query with condition e.g /?name=victorogbonna.(rA)
- put /api/user/:id- update user info (rC)
- delete /api/user/:id- delete user (rC)

#### Product route
- post /api/product/add- for adding product (rA)
- get /api/product/:id - get product by id as request params
- get /api/product/all/products- get products. it returns everything by default but you can set the query with condition e.g /?color=red.

#### Order route
- post /api/order/add- for adding order (rC) 
- get /api/order/:id - get order by id as request params (rC)
- get /api/order/all/orders- get orders (rAu)
- get /api/user/all/orders/user/:id- get orders by user id as request params.(rC)
- get /api/user/all/orders/product/:id- get orders by product id as request params.(rAu)


### Middlewares. There were 4 middleware in this application
- requireAuth- for anthenticated users only
- requireGuest-for non authenticated users only
- requireCurrentUser-for a specific authenticated user
- requireInstructor- for only instructor


### API routes for user services, for the site link, replace the http://localhost:400/ with https://infowaretask.herokuapp.com/

#### http://localhost:400/api/user/add (requireGuest) - post call to register user  
##### This will . Req.body should be like 
```javascript
{
  name:string,
  isAdmin:boolean,
  email:email regex,
  password:string
  gender:any one of ['male' 'female','others']
}
```
#### http://localhost:400/api/user/login (requireGuest) - post call to login user  
##### This will . Req.body should be like 
```javascript
{
  email:,
  password:
}
```
#### http://localhost:400/api/user/logout (requireAuth) - get call to logout user.  

#### http://localhost:400/api/user/getUser/:userId - get call to fetch user details, password excluded.

#### http://localhost:400/api/user/getUsers/all- get call to fetch all user details, password excluded.

#### http://localhost:400/api/user/getUser/:userId/classes- get call to fetch user classes.

#### http://localhost:400/api/user/deleteUser/:userId(requireCurrentUser)- delete call to delete user.

#### http://localhost:400/api/user/deleteUser/:userId(requireCurrentUser)- delete call to delete user.
#### N/B: if an instructor deletes account, all the classes created by the instructor gets deleted too, so as to avoid db query error.

### API routes for class services

#### http://localhost:400/api/class/create(requireInstructor) -post call to create a class. 
##### This will . Req.body should be like 
```javascript
{
  name:nameofclass,
  admin:objectid
}
```
#### http://localhost:400/api/class/join/classId(requireCurrentUser) -post call to create a class. 
##### This will . Req.body should be like 
```javascript
{
  "userid":useridtoadd
}
```
#### http://localhost:400/api/class/getClass/:classId- get call to fetch a class.
#### http://localhost:400/api/class/getClass/:classId/users- get call to fetch users in a class.
#### http://localhost:400/api/class/getClasses/all- get call to fetch all classes.

#### http://localhost:400/api/class/leave/:classId(requireCurrentUser)- put call to leave class.
#### Req.body should be like 
```javascript
{
  "userid":useridtoleave
}
``` 
#### http://localhost:400/api/class/leave/:classId(removeUser/:userId(requireInstructor)- put call to for an admin to remove a user.
#### Req.body should be like 
```javascript
{
  "adminId":adminId
}
``` 
#### N/B: An admin cannot leave their class, rather delete the class instead. Only admin to the class can make perform this api operation.

#### http://localhost:400/api/class/delete/:classId(requireInstructor)- delete call to delete class.
#### Req.body should be like 
```javascript
{
  "adminId":adminId
}
``` 
#### N/B: An admin cannot leave their class, rather delete the class instead. Only admin to the class can make perform this api operation.

### Contact 
- Email- victorgbonna@gmail.com
- Whatsapp - +234 8102603301
- Linkedln - [https://www.linkedin.com/in/victor-ogbonna-5a3113230](https://www.linkedin.com/in/victor-ogbonna-5a3113230)
-  Project Link: [https://github.com/victorgbonna/infowareTask](https://github.com/victorgbonna/infowareTask)
- Site Link: [https://infowaretask.herokuapp.com/](https://infowaretask.herokuapp.com/)
