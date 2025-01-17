const express = require('express');
const app = express();
const userRoute = express.Router();


// Player model
let User = require('../models/User');

// Add User
userRoute.route('/create').post((req, res, next) => {
  User.find({email:req.body.email},(error, data) => {
    if (error) {
      return next(error)
    } else {
      if(data.length==0)
      {
        User.create(req.body, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      }
      else{
        return next(error)
      }
      
    }
  })
  
});




// Get All Users
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Coaches
userRoute.route('/find-coaches').get((req, res) => {
  User.find({role:"coach"},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get single User
userRoute.route('/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update User
userRoute.route('/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete User
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})



module.exports = userRoute;