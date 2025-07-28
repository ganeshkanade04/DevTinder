create a repository
initialize the repository
node_modules,package.json,package-lock.json,
install express
create a server 
listen to port 7777
write request handle for /test,/hello 
install nodemon and update scripts inside the package.json 
what are dependencies


-initialize git 
-.gitignore
-create a remote repo on github
-Push all code to remove origin 


order of routes matter
-create multiple route handler-play with the code
and next() function 
-app.use('/user',rH,[rH2,rH3],rh4,rh5);
-what is middleware
-how express js basically hanldesrequests behind the scenes
-difference between app.use and app.all
-write dummy auth middleware for admin
-Error Handling using app.use('/',(err,req,res,next)={})

-create userSchema and user model 
-create post signupAPI to add data in database
-push some document using API calls from postman 
-error handling using try and catch 

-json object vs js object(diff)
-add the express.json() middleware to your app
-make your signup api dynamic to receive data from end user(postman,browser)
-User.findOne with duplicate email ids ,which object returned
-API-get user By email 
-API-Feed API-GET /Feed-get all user from database
-get user by findBYid function
-create delete user API
-diff between patch and put
--API-update user
-expore the mongoose DOcumantation for model methods 
-API-upadte user using emailId


-explore Schematype option from the documentation 
-add required,lowercase,unique,min,minLength,trim
-add default
-create custome validate function for gender 
-improve DB Schema PuT all appropriate validation on each field in schema
-add timestamps to the user schema
-add API level valaidation on Patch request and Signup post API
-add API validation for each feild 
-install validator library for valiadation 
-use validator library function on email,passward,photourl
-never trust req.body


-validate data in signup API
-install bcrypt library
-create passward hash using bcrypt hash and save password
-create login API and comapare password throe error if email and password is not valid

-install cookie parser
-creating get profile API send cookie back
-install jsonwebtoken
-In login API after email and password validation ,create JWT token and sent it user
-read the cookie inside your profile API and Find login user
-userAuth middleware
-add the userAuth middleware in profile API and new send connection request API
-set expiry jwt token and cookies 7 days
-create userSchema method to getJWT()
-create userSchema method to comapre Password

-expore Tinder APIs
-create list of all APIs you can think of in dev tinder 
-Group multiple routes under respective routers
-read documention for express.Router
-creating routes folder for managing auth,profile,request router 
-create authrouter,profilerouter ,requestrouter
-import these routes in app.js 
-create post logout API
-create PATCH/profile/edit
-create PATCh/profile/password API=>forget Password API
-make you validate all data in every POST ,PATCH APIS

-create connection request Schema
-send connection request API
-think about all corner cases
-$or and $and read more about
-read article compound indexes
-read more about indexing in mongodb
-why do we nedd indexing 
-what is advantage and disadvantage of indexing 