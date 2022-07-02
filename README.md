# Realtime-Chat
### IN this project I will try to follow up open resourses to build realtime chat 


##  we will try to deployed it to Heroku 

 ### [link for heroku](https://realtime-chat-team1.herokuapp.com/)
 * heroku app pic
 ![link](./public/image/Screenshot%20(354).png)

## introduction 
Realtime Chat With Users & Rooms 
* in this project we tryed to make live chat that any user can join on a spacific room , and he can send and recive messages from other user , 
* first we started with  installing some depandences 

        *  dotenv
        *  express
        *  moment
        *  socket.io


* then we prepare our express server   , and we take ready code for html and css for front page for the chat and we did small modification 
* then we have server main page that will handle all socket event 

* and we have main .js that will handle users masseges and we will keep listening to all events from the server 

* and we manage how to read an write from the html page 
* there is some picture from step by step 

this is some pic for the work going on 
![link](./public/image/Screenshot%20(332).png)
* we console log the result step by step 

![link](./public/image/Screenshot%20(333).png)

![link](./public/image/Screenshot%20(334).png)

![link](./public/image/Screenshot%20(335).png)
![link](./public/image/Screenshot%20(336).png)
![link](./public/image/Screenshot%20(337).png)




* And we have stretch goal to do sign up page then each user should sign in using user name and password

![link](./public/image/Screenshot%20(338).png) 


> ## update 
* I added extra sign up button so when you click it , we will move to the sign up page and u can fill your data as shown below : 

![link](./public/image/Screenshot%20(346).png)
![link](./public/image/Screenshot%20(347).png)

* also I connected the app to My data base so all user will be saved in our data base 

![link](./public/image/Screenshot%20(350).png)

* And after you fill your data and hit sign up button it will be saved on the data base and we will get this sample result 

![link](./public/image/Screenshot%20(348).png)
![link](./public/image/Screenshot%20(352).png)
![link](./public/image/Screenshot%20(349).png)


> ## the last stretch goal is that the user cant join until he sign up 