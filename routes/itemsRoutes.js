const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))

router
  .route("/")
  //get inventory items list (the first 8 items)
  .get(async (req, res) => {
    try {
      const inventory = await knex("inventories").select("*")
      res.json(inventory)
      console.log(inventory)
    } catch (error) {
      console.log("This is the error:", error)
    }
  })

  //post create a new item
  .post(async (req, res) => {
    try {
      if (!req.body.warehouse_id || !req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity) {
        res.status(400).send("Missing properties on the request body")
      } else {
        const idAmount = await knex("inventories").pluck("id")
        req.body.id = idAmount.length + 1
        await knex("inventories").insert(req.body)
        res.status(200).json(req.body)
      }
    } catch (error) {
      console.log("This is the error:", error)
    }
  })


router
  .route("/:id")
  //get one inventory item information
  .get(async (req, res) => {
    try {
    } catch (error) {
      console.log("This is the error:", error)

 
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

  .put(async (req, res) => {
    try {
      const idCheck = await knex("inventories").pluck("id")
      const warehouseidCheck = await knex("inventories").pluck("warehouse_id")
      console.log(idCheck)
      if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.status || req.body.quantity == null) {
        res.status(400).send("Missing properties on the request body")
      } else if (warehouseidCheck.includes(parseInt(req.body.warehouse_id)) == false) {
        res.status(400).send("Warehouse id not found")
        console.log(56)
      } else if (idCheck.includes(parseInt(req.params.id)) == false) {
        res.status(404).json("Not found the Item")
      } else if (!Number.isFinite(req.body.quantity)) {
        res.status(400).send("You need to add a number in quantity field")
      } else {
        console.log(typeof req.body.quantity)
        await knex("inventories").where("id", req.params.id).update(req.body)
        res.status(200).json(req.body)
      }
    } catch (error) {
      console.log("This is the error:", error)
    }
  })

  //delete an inventory item

  .delete(async (req, res) => {
    try {
      await knex("inventories").where("id", req.params.id).del()
      res.json(`Inventories ${req.params.id} eliminated`)
    } catch (error) {
      console.log("This is the error:", error)
    }
  })

module.exports = router
