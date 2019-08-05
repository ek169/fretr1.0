var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// password hashing function

var userSchema = new Schema({
  name: String,
  email: String,
  img: String,
  credentials: [{id: String, token: String}],
});

// checking if password is valid
userSchema.methods.validCredential = function(id, token) {
  var hashed_token;
  for(i = 0; i < this.credentials.length; i++)
  {
    if(this.credentials[i][0] === id)
    {
      hashed_token = this.credentials[i][1];
    }
  }
  return bcrypt.compareSync(token, hashed_token);
};
var User = mongoose.model('user', userSchema);
module.exports = User;
