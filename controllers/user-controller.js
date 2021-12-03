const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
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
   },
 /*  getUserById({ params }, res) {
        User.findOne({ _id: params.id })
           .select('-__v')
            .then(dbUserData => {
              if (!dbUserData) {
                   res.status(404).json({ message: 'No user found with this id!' });
                  return;
        }
               res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
   }, */
    
   createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
 };

 module.exports = userController;