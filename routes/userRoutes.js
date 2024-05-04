const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updatedUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
