const { Thought, User } = require('../models');

 const thoughtController = {
   getThoughts(req, res) {
        Thought.find({})
        /* .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 }) */
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    }, 

   /*  createThought({body}, res) {
      Thought.create(body)
     //.findOneAndUpdate({_id: params.thoughts}, body, {new: true, runValidators: true })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json({message:'No user found with this id!'}));
      // console.log("Your thought message has succesfully added!")
    }, */
// REVIEW CODE LATER
    createThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: params.id},
            { $push: { thought: _id } },
            { new: true }
          );
        })
        .then(dbThoughtData => res.json("Your thought has been added!"))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
};

module.exports = thoughtController;