# Encrypted Email Service

![logo](client/src/assets/logo.svg =113x80)

This is a Node.js email application, created using Express.js, MongoDB, cryptico library and Vue.js that provides the functionality of general email service, such as sending and receiving emails, attach files, set labels, but with better safety.

### Features
- end-to-end encryption
- Vue.js SPA
- file attachment( < 5MB)
- 2 roles user and admin(can see other users and change their role)
- view chat story

### API 
Using API you should realize encryption with cryptico library. There is API documentation on this site on about page.

### Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies. For developing comment 11-12 and 30-32 lines in app.js. Then go to client/ folder and setup client side accordingly to the local README.

### Todos 
(for your hosting)
 - If receiver is not from your service, create plain(with no encryption) version of letter and send it to the server, where you need to realize sending to another service
 - When receiving letter from another service, redirect this request to the post 
