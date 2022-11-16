const {Schema, model} = require("mongoose");
const reaction = require("./Reaction");
const moment = require("moment");

const thought = new Schema(
    {
        thoughtText: {
            type: Schema.Types.String,
            required: true,
            minLength: 1,
            maxLength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdTime){
                return moment(createdTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
            }
        },
        username: {
            type: Schema.Types.String,
            required: true
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

thought.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thought);

module.exports = Thought;