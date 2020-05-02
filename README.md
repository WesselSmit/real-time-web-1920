# Concept

This app allows people to troubleshoot and improve your code, through: pull requests & syntax highlighting. 

It's a platform where programmers can help peers through a real-time connection; all users in the same room can see the host's code (real-time updated). User can reference code which allows them to:
* mark invalid/jeopardizing code
* suggest improvements/fixes through pull-requests

It also has core code-editor features to improve the user experience and help identify problems early;
* syntax highlighting
* beautify


![image](https://user-images.githubusercontent.com/45405413/80893530-680ea600-8cd3-11ea-9f84-e2e6bacd9423.png)

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

> `users` refers to everyone in room **except** host, `clients` refers to all users in room **including** host

| Event | Trigger | Usage | 
| ----- | ------- | ------- | 
| `join-room` | when script loads | save user in database, subscribe to channel (fires `room-list`, `user-list`, `update-code` & `get-pull-requests`) | 
| `room-list` | when a client joins/leaves room | send list of all rooms & update list of rooms in interface | 
| `user-list` | when a client joins/leaves room | send list of all users in current room & update list of users in interface | 
| `update-code` | when a client joins room / host edits code | get most recent code & update displayed code | 
| `get-pull-requests` | when a client joins room | get all pull-requests in room & update list of pull-requests in interface | 
| `code-edit` | when host edits code | save code in database (fires `update-code`) | 
| `pull-request-submit` | when user submits pull-request | saves pull-request to database (fires `pull-request-pending`) |
| `pull-request-pending` | when user submits pull-request | updates interface for all clients with submitted pull-request |
| `pull-request-review` | when host accepts/declines pull-request | updates pull-request status in database (fires `pull-request-reviewed`) | 
| `pull-request-reviewed` | when host accepts/declines pull-request | updates interface for all clients with reviewed pull-request (reflecting review status) & if accepted also overwrites the code | 
| `syntax-lookup` | when user submits keyword input | searches for [keyword] syntax example on mdn (fires `syntax-snippet`) | 
| `syntax-snippet` | when user submits keyword input | updates interface for client with syntax-snippet | 





# External API

I ended up not using an api, instead I use [puppeteer](https://github.com/puppeteer/puppeteer) to scrape [mdn](https://developer.mozilla.org/en-US/) for syntax snippets. Users can enter a keyword to get a syntax example.

### How it works

1. User enters keyword they want the syntax snippet for.

<img src="https://user-images.githubusercontent.com/45405413/80891991-fa10b180-8cc7-11ea-9cdd-fba14876ba1e.png" width="200px">

2. Puppeteer launches a headless browser instance, navigates to [google](https://www.google.com) and enters the following search query:

```
mdn [keyword] site:developer.mozilla.org
```

> `site:developer.mozilla.org` ensures that all results are from [mdn](https://developer.mozilla.org/en-US/)

3. Puppeteer navigates to the first google-result link. (which'll navigate to mdn)

> I decided to use google's search engine instead of the mdn search functionality because mdn's search function doesn't take popularity in account when searching which means you can end up with mismatches (e.g. first result for `append` on mdn is `headers.append` instead of `parentNode.append`) 

4. Every page that has a syntax sxample on mdn follows the same structure (which makes this possible); the syntax snippet always comes right after a title "Syntax".

<img src="https://user-images.githubusercontent.com/45405413/80892338-853e7700-8cc9-11ea-8eaa-41c70d9217c3.png">

5. Puppeteer waits for the `#Syntax` selector to be available and then grabs the next `<pre>` element's textContent. (this is the syntax snippet)

6. This snippet is send to the client, the javascript code creates a card which is appended to the DOM.

<img src="https://user-images.githubusercontent.com/45405413/80892427-40ffa680-8cca-11ea-8852-e55c7b24f13e.png" height="100px">

>If at any point an error occurs the client is send an card which contains a error message.<img src="https://user-images.githubusercontent.com/45405413/80892467-af446900-8cca-11ea-94f1-f1ad425eb9dd.png" height="100px">

# Credits

### [codemirror](https://codemirror.net/)

Library used to make the code-editor 

### [socketIO](https://socket.io/)

Package used to establish real-time connection

### [puppeteer](https://github.com/puppeteer/puppeteer)

Package used to scrape mdn for syntax examples

### [Particle Animation](https://codepen.io/tutsplus/pen/MrjYJK?editors=0100)

Animation by `tutsplus` for the particles used in the register screen

### [Input Animation](https://codepen.io/lucasyem/pen/ZEEYKdj?editors=1100)

Animation by `lucsayem` for the input used in the register screen

[MIT](https://github.com/WesselSmit/real-time-web-1920/blob/master/LICENSE) © [Wessel Smit](https://github.com/WesselSmit)
