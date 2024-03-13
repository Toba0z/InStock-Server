const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

//Tentative endpoint denomination

//get warehouse list (the first 7 warehouse)
router
  .route("/")
  .get(async (req, res) => {
    try {
      const warehouse = await knex("warehouses");
      res.json(warehouse);
      //    console.log(inventory)
    } catch (error) {
      console.log("This is the error:", error);
    }
  })
  //post create a new warehouse
  .post(async (req, res) => {
    try {
      const checkForLetter = "@";
      if (
        req.body.warehouse_name == null ||
        req.body.address == null ||
        req.body.city == null ||
        req.body.country == null ||
        req.body.contact_name == null ||
        req.body.contact_position == null ||
        req.body.contact_phone == null ||
        req.body.contact_email == null
      ) {
        res.status(400).send("Missing properties on the request body");
      } else if (
        req.body.contact_phone.length !== 17 ||
        req.body.contact_email.includes(checkForLetter) === false
      ) {
        console.log(req.body.contact_phone.length);
        res.status(400).send("Invalid email or phone number");
      } else {
        console.log(req.body);
        await knex("warehouses").insert(req.body);
        res.status(200).json(req.body);
      }
    } catch (error) {
      console.log("This is the error:", error);
    }
  });

router
  .route("/:id/inventories")
  // get the list of ALL inventory for a particular warehouse
  .get(async (req, res) => {
    try {
      const idCheck = await knex("warehouses").pluck("id");
      console.log(idCheck);
      if (idCheck.includes(parseInt(req.params.id)) == false) {
        res.status(404).json("Not found the Warehouse");
      } else {
        const warehouseInventoryItems = await knex("inventories")
          .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
          .select(
            "inventories.item_name",
            "inventories.category",
            "inventories.status",
            "inventories.quantity",
            "warehouses.warehouse_name"
          )
          .where("warehouses.id", "=", parseInt(req.params.id));
        console.log(warehouseInventoryItems);
        res.json(warehouseInventoryItems);
      }
    } catch (error) {
      console.log("This is the error:", error);
    }
  });

router
  .route("/:id")
  //get one warehouse information based in the id  //=======Toba =========
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const warehouse = await knex("warehouses").where({ id: id }).first();
      if (!warehouse) {
        return res.status(404).json({ error: "Warehouse not found" });
      }
      res.status(200).json(warehouse);
    } catch (error) {
      console.log("This is the error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  
  //put update a warehouse
  .put(async (req, res) => {
    try {
    } catch (error) {
      console.log("This is the error:", error);
    }
  })

  // delete a warehouse

  .delete(async (req, res) => {
    try {
      await knex("warehouses").where("id", req.params.id).del();
      res.json(`Warehouse ${req.params.id} eliminated`);
    } catch (error) {
      console.log("This is the error:", error);
    }
  });

module.exports = router;
