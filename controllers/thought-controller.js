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
          .then(dbData => res.json(dbData))
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
    createThought({  body }, res) {
      
      Thought.create(body)
        .then((dbUserData) => {
          // console.log(dbThoughtsData)
          return User.findOneAndUpdate(
            { _id: body.userId},
            { $push: { thought: dbUserData._id }},
            { new: true }
          );
        })
        .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    getThoughtId({params}, res) {
      Thought.findOne({thoughtId: params.id})
      .populate({
        path: 'thoughts',
        select:('-__v')
      }) .then(dbData => {
        if (!dbData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
     }
        res.json(dbData);
     })
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
    },

    updateThought({params, body}, res) {
      Thought.findOneAndUpdate({thoughtId: params.id}, body, {new: true, runValidators: true})
      .then(dbData => {
        if(!dbData) {
        res.status(404).json({
          message:'No Thought found with this Id!' });
          return;
         } res.json(dbData);
      }).catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ thoughtId: params.id})
      .then(dbData => {
        if(!dbData) {
          res.status(404).json({message:'No thought found with this id!'})
        
        } res.json(dbData);
      }).catch(err => res.status(400).json(err));
    },

  
    };

module.exports = thoughtController;