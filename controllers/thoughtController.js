const {Thought, User} = require('../models');
const {Types} = require('mongoose');

const noUserFound = "No thought with that ID";

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: Types.ObjectId(req.body.userId) },
              { $addToSet: { thoughts: Types.ObjectId(thought._id) } },
              {runValidators: true, new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: noUserFound,
                })
              : res.json('Thought created successfully')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: noUserFound })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: Types.ObjectId(req.params.thoughtId) })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: noUserFound })
            : User.findOneAndUpdate(
                { thoughts: Types.ObjectId(req.params.thoughtId) },
                { $pull: { thoughts: Types.ObjectId(req.params.thoughtId) } },
                { new: true }
            )
        )
        .then((user) =>
        !user
            ? res
                .status(404)
                .json({ message: noUserFound })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: Types.ObjectId(req.params.thoughtId) },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: noUserFound })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
   
    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: Types.ObjectId(req.params.thoughtId) },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: noUserFound })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: Types.ObjectId(req.params.thoughtId) },
          { $pull: { reactions: { _id: Types.ObjectId(req.params.reactionId) } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: noUserFound })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    };