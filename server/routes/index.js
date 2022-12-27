const UserController = require("../controllers/usersController");
const { authentication } = require("../middleware/authentication");
const router = require("express").Router();

router.post("/users/", UserController.registerNewUser);
router.get("/users/", UserController.getAllUsers);
router.get("/users/:id", UserController.getDetailUser);
router.put("/users/:id", UserController.getDetailUser);
router.use(authentication)
router.delete("/users/:id", UserController.deleteUser);


module.exports = router;
