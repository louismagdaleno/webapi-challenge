const actionDB = require("../data/helpers/actionModel");
const projectDB = require("../data/helpers/projectModel");

const validateActionId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await actionDB.get(id);

    if (!action || Object.keys(action).length < 1)
      return res.status(400).json({ message: "Could not find that action." });

    req.action = action;
  } catch (err) {
    res.status(500).json(err);
  }

  next();
};

const validateAction = async (req, res, next) => {
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes)
    return res.status(400).json({
      message: "An action requires a project_id, description, and notes."
    });

  const project = await projectDB.get(project_id);

  if (!project || Object.keys(project).length < 1)
    return res.status(400).json({ message: "No such project." });

  req.action = req.body;

  next();
};

module.exports = {
  validateActionId,
  validateAction
};
