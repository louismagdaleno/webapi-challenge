const projectDB = require('../data/helpers/projectModel')



const validateProjectId = async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await projectDB.get(id);

        if (!project || Object.keys(project).length < 1) return res.status(400).json({ error: "No such project found."});

        req.project = project;
    } catch(err) {
        res.status(500).json(err);
    }

    next();
}

const validateProjectBody = (req, res, next) => {
    const { name, description } = req.body;

    if (!name || !description) return res.status(400).json({ message: "Name and description are both required"});

    req.project = { name, description };

    next();
}

module.exports = {
    validateProjectId,
    validateProjectBody
}