var server = require('./server');
var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
    console.log('Server is up and running on port 3000');
});
