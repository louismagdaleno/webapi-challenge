const express = require('express');
const actionDB = require('../data/helpers/actionModel');

const {
    validateActionId,
    validateAction
} = require('../middleware/actionMiddleware');

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const actions = await actionDB.get();

        if (!actions || Object.keys(actions).length < 1)
            return res.status(400).json({ message : "An error has occured while retrieving actions. "});
        res.json(actions);
    
    } catch(err){
        res.status(500).json(err);
    }
});

router.get("/:id", validateActionId, (req, res) => {
    res.json(req.action);
  });
  
  router.post("/", validateAction, async (req, res) => {
    try {
      const action = await actionDB.insert(req.action);
  
      if (!action || Object.keys(action).length < 1)
        return res.status(400).json({ message: "Unable to insert action." });
  
      res.status(200).json(action);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.put("/:id", validateActionId, async (req, res) => {
    try {
      const action = await actionDB.update(req.action.id, req.body);
  
      if (!action || Object.keys(action).length < 1)
        return res.status(400).json({ message: "Unable to update action." });
  
      res.json(action);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete("/:id", validateActionId, async (req, res) => {
    try {
      const result = await actionDB.remove(req.action.id);
      if (!result)
        return res.status(400).json({ message: "Unable to delete that." });
  
      res.json({ message: "Deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;