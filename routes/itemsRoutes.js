const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile'))


router.route('/')
//get inventory items list (the first 8 items)
  .get(async (req, res) =>  {
    try {
       const inventory = await knex('inventories').select('*').limit(8)
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
    try { const id =req.params.id;
    const item = await knex("inventories").where({id:id}).first();
    if(!item){
      return res.status(404).json({error: "Item not found"})
    }
    res.status(200).json(item);
        
    } catch (error) {
        console.log('This is the error:', error)
        res.status(500).json({ error: "Internal server error" });
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