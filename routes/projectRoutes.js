const express = require("express");
const projectDB = require("../data/helpers/projectModel");

const {
  validateProjectId,
  validateProjectBody
} = require("../middleware/projectMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await projectDB.get();

  res.json(projects);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  res.json(req.project.actions);
});

router.post("/", validateProjectBody, async (req, res) => {
  try {
    const project = await projectDB.insert(req.project);

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", validateProjectId, async (req, res) => {
  try {
    const project = await projectDB.update(req.project.id, req.body);

    if (!project || Object.keys(project).length < 1)
      return res.status(400).json({ message: "Unable to update the project." });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    const result = await projectDB.remove(req.project.id);

    if (!result)
      return res.status(400).json({ message: "Could not delete the project." });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;