const express = require('express')
const router = express.Router()


//Tentative endpoint denomination

//get warehouse list (7warehouse)
router.route('/')
  .get(async (req, res) =>  {
    try {
        res.json('Testing')
    } catch (error) {
        console.log('This is the error:', error)
    }
  })
//post create a new warehouse
.post(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })


router.route('/:id')
//get one warehouse information and at the same time get all (probably the 8 first) the list inventory for one warehouse
.get(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

//put update a warehouse

.put(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

// delete a warehouse

.delete(async (req, res) =>  {
    try {
        
    } catch (error) {
        console.log('This is the error:', error)
    }
  })

module.exports = router