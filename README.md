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

 

### Data Life Cycle

>v1 _(friday April 17th)_

![image](https://user-images.githubusercontent.com/45405413/79559908-d2ee9900-80a6-11ea-80a3-038f475790e6.png)
