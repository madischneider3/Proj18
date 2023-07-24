const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  const Thought = model("Thought", thoughtSchema);
  
  module.exports = Thought;