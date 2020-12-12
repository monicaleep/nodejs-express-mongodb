module.exports = app => {
  const tutorials = require('../controllers/tutorial.controller.js')
  let router = require('express').Router();

  //create a new tutorial
  router.post('/', tutorials.create)
  //retrieve all tutorials
  router.get('/',tutorials.findAll)
  // retrieve all published tutorials GET	   api/tutorials/published	find all published Tutorials
  router.get('/published',tutorials.published)
  //retrieve single tutorial with id
  router.get('/:id',tutorials.findOne)
  //update a tutorial with id
  router.put('/:id',tutorials.update)
  // delete a tutorial
  router.delete('/:id',tutorials.delete)
  // DELETE	api/tutorials	remove all Tutorials
  router.delete('/',tutorials.deleteAll)
  //GET	   api/tutorials?title=[kw]	find all Tutorials which title contains 'kw' -- put this into the findall  route

  app.use('/api/tutorials', router)
}
