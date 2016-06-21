var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Users = mongoose.model('Users');

exports.authenticate = function(req, res) {
  Users.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign(user, 'secret', {
          expiresIn: 86400 // 1 jour
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
};

exports.users = function (req, res) {
  Users.find(function (err, users) {
    if (err) return console.error(err);
      res.json({users: users});
  });
};

exports.user = function(req, res) {
  Users.find({username: req.params.name}, function(err, user) {
    if (err) return console.error(err);
    res.json({user});
  })
};

exports.adduser = function (req, res) {
  Users.find({username: req.body.username}, function (err, user) {
    if (err) return console.error(err);
    if(user.length == 0) {
      new Users({
        username: req.body.username,
        email: req.body.email
      }).save(function (err, newUser) {
        if (err) return console.error(err);
        res.json({message:'User created'});
      });
    } else res.json({message:'Username already exists'});
  })
};

exports.deleteuser = function(req, res) {
  Users.remove({username: req.params.name}, function(err, user) {
    if (err) return console.error(err);
    res.json({message:'User deleted'});
  })
};
