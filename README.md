# Tovia's Enigma

Coding Challenge for Tovia
Submission by Jason Kim

## Getting Started

1. Install dependencies: `npm install`
2. Open a terminal window and start server: `npm start`
3. In a separate terminal window, execute bundle command: `npm run bundle`
4. Open in browser at specified port (default port: 1337). For example, `localhost:1337` or `127.0.0.1:1337`

To run ESLint on the client files: `npm run lint`

## Usage

Encryption
1. Fill out all fields (Name, Message, Date)
2. Generate new Passphrase (optional) - by default, a random passphrase will generate upon page load
3. Click the "Encrypt" button to receive the encrypted message code
4. Click on the passphrase to copy to clipboard

Decryption
1. Visit the URL with the passphrase in the following format: `localhost:1337/#<passphrase>`
2. The passphrase at the bottom of the page should use the hashed passphrase key
3. Click the "Decrypt" button and then paste the code received in the previous step
4. Click the "Decrypt" button in the pop up dialog box to load the message

NOTE: Messages with invalid codes or expired dates will NOT be decrypted

## Resources / External Libraries

[GIF Example](https://media.giphy.com/media/l0Iye9w3CFoz5rP2w/source.gif)  
[React](https://facebook.github.io/react/docs/installation.html)  
[Babel](http://babeljs.io/)  
[Webpack](https://webpack.js.org/)  
[React Toolbox](http://react-toolbox.com)  
[Bootstrap 4](https://getbootstrap.com/)  
[React Copy-to-Clipboard](https://github.com/nkbt/react-copy-to-clipboard)  
[Crypto](https://nodejs.org/api/crypto.html)  
[ESLint](https://eslint.org/)  