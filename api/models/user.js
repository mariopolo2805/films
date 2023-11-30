const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moongose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  }, {
    timestamps: true
  }
);

userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, 10);
})

const UserModel = moongose.model('User', userSchema);
module.exports = UserModel;