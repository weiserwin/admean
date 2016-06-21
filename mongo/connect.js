var mongoose = require('mongoose');
mongoose.set("debug",true);

var dbURI = 'mongodb://localhost:27017/MeanApp'

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

require('./schema');

var Users = mongoose.model('Users');

Users.findOne({
        username: "admin"
      }, function(err, user) {
            if (err) throw err;
            if (!user) {
              var u = new Users({
                username: "admin",
                email: "admin@admin.com",
                password: "admin",
              });

              u.save(function(err) {
                if (err) throw err;
                console.log('Admin user created');
              });
            }
});
