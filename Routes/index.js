const express = require('express')
const router = express.Router();

var itemsController = require('../src/Controller/items');

module.exports = () => {
  router.get('/', itemsController.list)
  router.post('/add', itemsController.save)
  router.get('/update/:id', itemsController.edit)
  router.post('/update/:id', itemsController.update)
  router.get('/delete/:id', itemsController.delete)
  return router
}
