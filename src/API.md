#authRouter
-POST /signup
-POST /login
-POST /logout

#profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

#connectionRequestRouter
dynamic API--POST /request/send/:status/:userId
dynamic API--POSt /request/review/:status/:requestId

-POST /request/send/intrested/:userId
-POST /request/send/ignored/:userId
-POSt /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

#userRouter
-GET /user/connection
-GET /user/requests
-GET /user/feed gets you the profiles of other user on platfrom 

Status:ignore ,intersted ,accepated,rejected 





