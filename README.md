# Description

App is implementation of library system for storing data about books, publishers, and authors.

All users of the app are enabled to see all authors, books, and publishers, while only admin users have the ability to perform basic CRUD operations.

To prevent CRUD operations from POSTMAN and similar tools, middleware is added to check if user is logged in and if user is admin. Checking of user role and signin status is done by using httponlycookie. If user has jwttoken stored in cookie user is logged in, while if jwtToken role value is admin, user is authorized to perform CRUD operations.

Admin can:

1. Add, edit, and delete authors, publishers and books

Users can:

1. View authors, publishers and books

App enables admin to store images for authors and books. For this purpose mutler express middleware is used and static route. Multer will check if user has folder /images on express server and if not one will be created. 

All images used in app are stored in server/images folder. In case if user does not upload book or author image there are default images (for books noimg.jpr and for author - noimgUser.jpg)

For importing files in database I used Mongo Compas. I have converted Excel file to JSON and then imported it into Atlas Mongo DB

## Important notes

I had to name app library-2 as there is system folder library on Mac and I could not use it. If I rename it on git I will probably have troubles in process of correcting potential errors.

In order to use the app you shound change in server/config/config.js url for Atlas Mongo DB database and in client/.env file you should store following data:

### DATABASE=library
### PASSWORD=jOS3nAMP9GVYKdKH

For this app user data delivered with the assignment were used and they can be used for grading the app.
### User credentials
Id	name	username	password	role
1.	John Smith 	john	$ch00l	admin
2.	Ana Boyle	ana	$ch00l	admin
3.	Antonio Banderas	tony	$ch00l	user
4.	Julio Iglesias	julio	$ch00l	user
5.	Placido Domingo	place	$ch00l	user

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is http://localhost:5000. In case you are using Mac change default port to 3001 as 5000 is not allowed on Mac. Also don't forget to change on proxy last part of the string (5000 to 3001)

In this assignment I was mostly focused on creating reusable components: SelectField, DatePicker, Tables. I would highly appreciate your feedback about the design of components as I mostly focused on this aspect in phase 7 of Paragon


## Redux toolkit
For state management Redux toolkit is used. For fetching API data redux thunk middleware is used.

## Server and database
For server express is used and all server logic is stored in server folder.

## UI
For UI Material UI (MUI) library is used.


