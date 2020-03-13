const express = require("express");
const Actions = require("./actionModel");
const router = express.Router();

// GET BY ID .get(id)
router.get("/:id", validateActionId, (request, response) => {
  const { id } = request.params;
  Actions.get(id)
    .then(actionFound => {
      response.status(200).json(actionFound);
    })
    .catch(error => {
      response.status(500).json({ errror: "Error getting action" });
    });
});

// PUT BY ID .update(id, changes)
router.put("/:id", validateActionId, (request, response) => {
  Actions.update(request.action.id, request.body)
    .then(changes => {
      response.status(200).json(changes);
    })
    .catch(error => {
      response.status(500).json({ error: "Error updating action" });
    });
});

// DELETE BY ID .remove(id)
router.delete("/:id", validateActionId, (request, response) => {
  Actions.remove(request.action.id)
    .then(count => {
      response.status(200).json({ message: "Action has been deleted" });
    })
    .catch(error => {
      response.status(500).json({ error: "Error deleting action" });
    });
});

// custom middleware
function validateActionId(request, response, next) {
  const { id } = request.params;
  Actions.get(id)
    .then(actionFound => {
      if (actionFound) {
        request.action = actionFound;
        next();
      } else {
        response.status(400).json({ error: "This action doesn't exist" });
      }
    })
    .catch(error => {
      response.status(500).json({ error: "Error validating action ID" });
    });
}

module.exports = router;
