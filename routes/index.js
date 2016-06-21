exports.index = function(req, res){
  res.render('index', { title: 'User Management App' });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
