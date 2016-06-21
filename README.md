##To launch the web app

1) npm install

2) npm start

3) go to https://localhost:4430


- - -


####User management app
Very basic user administration web app using the MEAN stack and jade templates

Data is accessed through an API available at /api/...

- list users : `GET /api/users`

- add users : `POST /api/users`

- authenticate : `POST /api/auth`

(REQUIRES AUTH) :

- user info (where :name is the unique username) : `GET /api/user/:name`

- delete user (where :name is the unique username) : `DELETE /api/user/:name` 


==The app tries to access a mongo database located at localhost:27017. If you want to change this, edit <b> mongo/connect.js. </b>==



####Rules
- Everybody can view the current list of users.

- Everybody can add new users (name + email).

- The admin can log in the site to see user details and delete user. Admin account is created when the server starts (credentials : admin ; admin)

- Authentication is handled with a jsonwebtoken stored in local storage and given to the API in the authorization header. Token are valid for 24 hours.
