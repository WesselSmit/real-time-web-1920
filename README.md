# Practice Chat App

To understand & get familiar with socketIO we had to make a chat app.

People can join the room under an alias and chat with other people. 

## Features 

### See all users in current room

In the sidebar there is a section titled "Users in `current-room-name`", it contains a list of all users currently in the room.

### Announcements

Non-user messages are called announcements. They have a special design to help the user differentiate between messages and announcements. Announcements examples are:

* users joining the room 
* users leaving the room
* commands 

### Commands 

As unique feature the app has 2 commands (could be expanded later on..). 

* **!help** | shows command explenation & list of all commands as announcement in chat
* **!random** | shows a random gif from giphy as message 

> `!random` isn't finished because the giphy website wouldn't let me create an account needed the aquire an api-key

## Events

To communicate in real-time between the client and server I've used socketIO, socketIO uses events to send data back-and-forth between client and server & respond to changes. 

### join room

User joins room.

>triggered when the clientside-JS script is loaded

### disconnect

User disconnects from room.

>triggered when user disconnects from room (by various reasons)

### chat message

User sends a message (non-command).

>triggers when user submits input

### announcement

User-event messages usch as: user triggered commands & user activities (joining & leaving). 
