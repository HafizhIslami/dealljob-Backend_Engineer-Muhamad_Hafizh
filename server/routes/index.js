const UserController = require("../controllers/usersController");
const errorHandler = require("../middleware/errorHandler");
const router = require("express").Router();

router.post("/users/", UserController.registerNewUser);
router.get("/users/", UserController.getAllUsers);
router.get("/users/:id", UserController.getDetailUser);
router.delete("/users/:id", UserController.deleteUser);

router.use(errorHandler);

module.exports = router;
