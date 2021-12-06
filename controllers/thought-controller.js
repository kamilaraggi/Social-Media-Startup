const { Thought } = require('../models');

 const thoughtController = {
   /* getThoughts(req, res) {
        Thought.find({})

        .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    }, */

    createThought({body}, res) {
      Thought.create(body)
     // .findOneAndUpdate({_id: params.thoughts}, body, {new: true, runValidators: true })
      .then(dbThoughtData => res.json(dbThoughtData))
      console.log("Your thought message has succesfully added!")
      .catch(err => res.json(err));
    }
};

module.exports = thoughtController;