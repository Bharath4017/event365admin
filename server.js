//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
var serverPort = 8081;
app.listen(process.env.PORT || serverPort, () => {
  console.log('Server is running!')
});
