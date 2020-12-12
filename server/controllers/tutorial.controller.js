const db = require('../models/index')
// grabs the tutorial model from models index where everything is brought together
const Tutorial = db.tutorials

// create and save a new tutorial
exports.create = (req,res) => {
  // validate request
  if (!req.body.title){
    res.status(400).send({message:'Title cannot be empty'})
    return
  }
  // create a tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  })

  // save tutorial in the database
  tutorial.save(tutorial)
    .then(data=>{
      res.send(data)
      })
    .catch(err=>{
      res.status(500).send({
        message: err.message || "some error occurred while creating the tutorial"
    })
  })
}


// find all tutorials
exports.findAll = (req,res) => {
  Tutorial.find({})
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials"
    })
  })
}

// find a single one
exports.findOne = (req,res) => {
  Tutorial.findById(req.params.id)
  .then(data=>{
    if(!data){
      return res.status(400).send({message: "Did not find tutorial with id " + req.params.id})
    } else{
      res.send(data)
    }
  })
  .catch(err=>res.status(500).send({message: err.message || "Error retrieving the tutorial"}))
}


exports.update = (req,res) => {
  Tutorial.updateOne({_id: req.params.id}, {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  }).then(data=>{
    res.send(data)
  }).catch(err=>{
    res.status(500).send({message: err.message || "An error occurred"})
  })
}


exports.delete = (req,res) => {
  Tutorial.deleteOne({_id:req.params.id}).then(data=>res.send(data)).catch(err=>res.status(500).send({message: err.message || "An error occurred"}))
}

exports.published = (req,res) => {
  Tutorial.find({published:true})
  .then(data=>res.send(data))
  .catch(err=>res.status(500).send({message: err.message || "An error occurred"}))
}

exports.deleteAll = (req,res) => {
  Tutorial.deleteMany({})
  .then(data=>res.send(data))
  .catch(err=>res.status(500).send({message: err.message || "An error occurred"}))
}
