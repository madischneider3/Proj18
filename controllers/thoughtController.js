const { Thought, User } = require("../models");

module.exports = {
  
  getThoughts: function (req, res) {
    Thought.find()
      .then(function (thoughts) {
        res.status(200).json(thoughts);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
  },
 
  getIdvThought: function (req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(function (thought) {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID exists" });
        } else {
          res.json(thought);
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createThought: function (req, res) {
    Thought.create(req.body)
      .then(function ({ _id }) {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(function (user) {
        if (!user) {
          res.status(404).json({
            message: "Thought created, but found no user with that ID",
          });
        } else {
          res.json("Created the thought 🎉");
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought: function (req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(function (thought) {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID exists" });
        } else {
          return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
        }
      })
      .then(function (user) {
        if (!user) {
          res.status(404).json({
            message: "Thought deleted, but no user with that ID exists",
          });
        } else {
          res.json({ message: "Thought deleted successfully 🎉" });
        }
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  },
 
  updateThought: function (req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true } 
    )
      .then(function (thought) {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID exists" });
        } else {
          res.json(thought);
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
  }
};