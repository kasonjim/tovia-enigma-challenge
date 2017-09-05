let app = require('./config.js');

let port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});