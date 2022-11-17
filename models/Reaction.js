const {Schema} = require("mongoose");


const reactionSchema = new Schema({
    reactionBody: {
        type: Schema.Types.String,
        required: true,
        maxLength: 280
    },
    username: {
        type: Schema.Types.String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get:()=>{
          let date = new Date ();
          return date.toLocaleString();
      }
    },
}, {
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;