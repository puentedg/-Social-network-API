const { Model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const user = new Schema(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);


module.exports = user;