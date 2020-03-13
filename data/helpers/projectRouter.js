const express = require("express");
const Projects = require("./projectModel.js");
const Actions = require("./actionModel.js");
const router = express.Router();

// GET PROJECT BY ID .get(id)
router.get("/:id", validateProjectId, (request, response) => {
  const { id } = request.params;
  Projects.get(id)
    .then(projectFound => {
      response.status(200).json(projectFound);
    })
    .catch(error => {
      response.status(500).json({ errror: "Error retrieving project" });
    });
});

// GET ACTIONS BY PROJECT BY .getProjectActions(projectId)
router.get("/:id/actions", validateProjectId, (request, response) => {
  const { id } = request.params;
  Projects.getProjectActions(id)
    .then(actionsFound => {
      response.status(200).json(actionsFound);
    })
    .catch(error => {
      response.status(500).json({ error: "Error retrieving actions" });
    });
});

// POST A NEW PROJECT BY .insert(project)
router.post("/", (request, response) => {
  Projects.insert(request.body)
    .then(newProject => {
      response.status(201).json(newProject);
    })
    .catch(error => {
      response.status(500).json({ error: "Error adding project" });
    });
});

// UPDATE PROJECT BY .update(id, changes)
router.put("/:id", validateProjectId, (request, response) => {
  Projects.update(request.project.id, request.body)
    .then(changes => {
      response.status(200).json(changes);
    })
    .catch(error => {
      response.status(500).json({ error: "Error updating project" });
    });
});

// DELETE PROJECT BY .remove(id)
router.delete("/:id", validateProjectId, (request, response) => {
  Projects.remove(request.project.id)
    .then(count => {
      response.status(200).json({ message: "This project has been nuked" });
    })
    .catch(error => {
      response.status(500).json({ error: "Error deleting this project" });
    });
});

// POST NEW ACTION TO PROJECT
router.post("/:id/actions", validateProjectId, (request, response) => {
  const actionWithProjectId = {
    ...request.body,
    project_id: request.project.id
  };
  Actions.insert(actionWithProjectId)
    .then(newAction => {
      response.status(201).json(newAction);
    })
    .catch(error => {
      response.status(500).json({ error: "Error adding action" });
    });
});

// custom middleware
function validateProjectId(request, response, next) {
  const { id } = request.params;
  Projects.get(id)
    .then(projectFound => {
      if (projectFound) {
        request.project = projectFound;
        next();
      } else {
        response.status(400).json({ error: "This project doesn't exist" });
      }
    })
    .catch(error => {
      response.status(500).json({ error: "Error validating project ID" });
    });
}

module.exports = router;
