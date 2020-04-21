# Concept

This app allows people to troubleshoot and improve your code, through: pull requests, validation & syntax highlighting. 

It's a platform where programmers can help peers through a real-time connection; all users in the same room can see the host's code (real-time updated). User can reference code which allows them to:
* mark invalid/jeopardizing code
* suggest improvements/fixes through pull-requests

It also has core code-editor features to improve the user experience and help identify problems early;
* syntax highlighting
* code validation (hinters)
* beautify


![RTWdesign](https://user-images.githubusercontent.com/45405413/79219333-5cf1f400-7e52-11ea-9e82-ee9950d86d33.png)

The app has  sections:
* [left] The host (and only the host) can type their code (source code)
* [middle] Pull requests & Code suggestions; users can suggest improvements through pull requests
     * [pull request] Users can reference source code line(s) and make suggestions (host can either accept or decline these, accepting overwrites referenced source code lines with pulled reuest)
* [right] Navigation & info
     * [rooms] List of available rooms (available coding/programming languages)
     * [users] List of users in current room
     

# Install Notes

To install this application follow these steps:

Clone the repo

```shell
git clone https://github.com/WesselSmit/real-time-web-1920.git
```

Navigate to the local repo 

```shell
cd real-time-web-1920
```
 
Install all dependencies

```shell
npm install
```

Run the application

```shell
npm start
```

# Data Life Cycle

>v2.2 _(monday April 20th)_

![image](https://user-images.githubusercontent.com/45405413/79784341-6263a880-8342-11ea-93ff-88a7ede015f5.png)

# Real-Time Events

List of all custom events:


* 
* 
* 

# External API

TODO: general API information (what it does, rate limit, key, register instructions etc.)

TODO: data format

[MIT](https://github.com/WesselSmit/real-time-web-1920/blob/master/LICENSE) © [Wessel Smit](https://github.com/WesselSmit)
