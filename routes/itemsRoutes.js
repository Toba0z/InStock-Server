const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))

router
  .route("/")
  //get inventory items list 
  .get(async (req, res) => {
    try {
      const inventory = await knex("inventories").select("*")
      res.json(inventory)
      
    } catch (error) {
      console.log("Error in Get Inventory Items List:", error)
      res.status(500).json({ error: "Internal server error" });
    }
  })

  //post create a new item
  .post(async (req, res) => {
    try {
      const { item_name, description, category, status, quantity, warehouse_id } = req.body
      if (!warehouse_id || !item_name || !description || !category || !status || quantity == null) {
        res.status(400).send("Missing properties on the request body")
      } else {
        await knex("inventories").insert(req.body)
        res.status(200).json(req.body)
      }
    } catch (error) {
      console.log("Error in post/create a new item:", error)
      res.status(500).json({ error: "Internal server error" });
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
        console.log('Error in get one inventory item information:', error)
        res.status(500).json({ error: "Internal server error" });

    }
  })

  //put update an inventory item

  .put(async (req, res) => {
    try {
      const idCheck = await knex("inventories").pluck("id")
      const warehouseidCheck = await knex("inventories").pluck("warehouse_id")
      const { item_name, description, category, status, quantity, warehouse_id } = req.body
      const {id} = req.params
      if (!item_name || !description || !category || !status || quantity == null) {
        res.status(400).send("Missing properties on the request body")
      } else if (warehouseidCheck.includes(parseInt(warehouse_id)) == false) {
        res.status(400).send("Warehouse id not found")
        
      } else if (idCheck.includes(parseInt(id)) == false) {
        res.status(404).json("Not found the Item")
      } else if (!Number.isFinite(quantity)) {
        res.status(400).send("You need to add a number in quantity field")
      } else {
        await knex("inventories").where("id", id).update(req.body)
        res.status(200).json(req.body)
      }
    } catch (error) {
      console.log("Error on edit/update inventory item:", error)
      res.status(500).json({ error: "Internal server error" });
    }
  })

  //delete an inventory item

  .delete(async (req, res) => {
    try {
      await knex("inventories").where("id", req.params.id).del()
      res.json(`Inventories ${req.params.id} deleted`)
    } catch (error) {
      console.log("Error on delete an inventory item", error)
      res.status(500).json({ error: "Internal server error" });
    }
  })

module.exports = router
