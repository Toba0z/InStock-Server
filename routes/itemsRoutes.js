const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile'))


router.route('/')
//get inventory items list (the first 8 items)
  .get(async (req, res) =>  {
    try {
       const inventory = await knex('inventories').select('*')
       res.json(inventory)
    console.log(inventory)
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

//post create a new item

.post(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

 
router.route('/:id')
//get one inventory item information 
.get(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

//put update an inventory item

.put(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

//delete an inventory item

.delete(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })


  module.exports = router