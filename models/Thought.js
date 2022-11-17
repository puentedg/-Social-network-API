const {Schema, model} = require('mongoose');
const reactionSchema = require("./Reaction");

const Thought = model('thought', thoughtSchema);

const thoughtSchema = new Schema(
    {
        thoughtText :{
            type: Schema.Types.String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get:()=>{
                let date = new Date ();
                return date.toLocaleString();
            }
          },
      username : [
        {
        type: Schema.Types.String,
        required: true,
        },
      ],
      reactions : [reactionSchema],

    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false
    }
    
);
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});   


module.exports = Thought;