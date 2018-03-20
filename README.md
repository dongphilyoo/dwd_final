# ITP DWD Spring 2018 Final Project

### Project Description
This project has a form of multiplayer game and it runs on the conjunction of Node.js + Express + Socket.io. The project is inspired by the game, [Last Man Standing](https://pheonise.itch.io/last-man-standing). The goal of our web based game is simple, on the surface. Player should find other players and kill them to survive. However, there are dummy players that mimic actual person player's figure, movement and intention in the game so that make the player confused. Each player can control their box character by voice input, and the commands are RIGTH, LEFT, KILL!

Behind the playful game scene, I tried to imply the dark side of anonymity, or harmfulness of indiscriminate political bias that induced by media or some veiled power.

In terms of functional specification, p5.js is used for displaying and p5.js's speech recognition library is used to get STT function.

### Challenges
Using Socket.io was quite easy and convenient to share data with server and client side back and forth, but handling all chaining communication flow was a bit treaky. Adding players and changing game environment dynamically were the most difficult part. Also, adjusting Speech to Text function to polish it properly for apt control input system in game was a big hurdle.

### Expectation
The prototype of this game project has a potential to be a light-weight social web game or could provide data which is related to human behavior for research purpose.

### Conclusion
Integrating server-side and client-side programming in one single web application was really productive for me since I've attampted to enhance my understanding of web developement. Especially, I was really into well-modularized node packages, and I do the research and do practice to use browserify or webpack to strengthen my server-side programming literacy.
