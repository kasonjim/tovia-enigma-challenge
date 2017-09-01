var app = require('./config.js');

var port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});