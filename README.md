# Concept

This app allows people to troubleshoot and improve your code.

It's a platform where programmers can help peers through a real-time connection; all users in the same room can see the host's code (updated in real-time). User can reference code which allows them to:
* mark invalid/jeopardizing code
* suggest improvements/fixes through pull-requests

![image](https://user-images.githubusercontent.com/45405413/80893530-680ea600-8cd3-11ea-9f84-e2e6bacd9423.png)

## Features

**Language support**

HTML, CSS & JS are supported.

**Syntax highlighting**

All syntax is highlighted to help notice typos.

**Pull-requests**

Users can reference code and offer replacement suggestions, a pull-request consists of:
* reference; reference (multiple) lines of code **(required)**
* suggestion; suggest a replacement for the referenced code **(required)**
* message; attach a message to explain your suggested changes **(optional)**

> Only referencing whitespace adds suggested code at position of the referenced code

**Syntax examples**

Allow users to lookup syntax  and receive examples/snippets from mdn by entering a keyword

**Real-time**

All content in the interface is updated in real-time;
* list of rooms
* list of users
* code
* pull-request (and all it's status updates)
* syntax snippets

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

I didn't have enough time to integrate a database so all data is stored on the server for now, however the structure would pretty much be the same except all data would live in the database and additional calls would have to be made between server and database before sending the data back to the client.

>v3.0 _(sunday May 3rd)_

![DLC v3 0](https://user-images.githubusercontent.com/45405413/80915213-2a506280-8d51-11ea-93d3-58ab7702417d.png)

The data on the server looks like this:

```javascript
const data = {
	rooms: [{
		name: "string",
		language: "string",
		host: {
			name: "string",
			id: "string"
		},
		users: [{
			name: "string",
			id: "string"
		}, {...}],
		code: "string",
		pullRequests: [{
			coordinates: {
				from: {
					line: 1,
					char: 3
				},
				to: {
					line: 5,
					char: 10
				}
			},
			message: "string",
			reference: "string",
			suggestion: "string",
			id: "string",
			sender: "string",
			status: "string"
		}, {...}]
	}, {...}]
}
```


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

# Expansion

If I had more time I would've liked to expand the syntax-lookup feature, there are a lot of possibilities and it's a really cool package. If I had more time I would've made a interface and help users lookup the syntax examples through offering addition search settings such as: choosing a website, choosing from the results after querying, get additional info such as (return-) values, and maybe examples in context.

The pull-request feature is very robust as of now and could be improved bt making it more intuitive.

# Credits

### [codemirror](https://codemirror.net/)

Library used to make the code-editor 

### [socketIO](https://socket.io/)

Package used to establish real-time connection

### [puppeteer](https://github.com/puppeteer/puppeteer)

Package used to scrape mdn for syntax examples

### [Debounce Function](https://www.geeksforgeeks.org/debouncing-in-javascript/)

I used their javascript debounce function

### [Generate UID Function](https://gist.github.com/jsmithdev/1f31f9f3912d40f6b60bdc7e8098ee9f)

I used `jsmithdev`'s UID generator function

### [Particle Animation](https://codepen.io/tutsplus/pen/MrjYJK?editors=0100)

Animation by `tutsplus` for the particles used in the register screen

### [Input Animation](https://codepen.io/lucasyem/pen/ZEEYKdj?editors=1100)

Animation by `lucsayem` for the input used in the register screen

[MIT](https://github.com/WesselSmit/real-time-web-1920/blob/master/LICENSE) © [Wessel Smit](https://github.com/WesselSmit)
