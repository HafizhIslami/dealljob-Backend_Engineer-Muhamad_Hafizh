const UserController = require("../controllers/usersController");
const { authentication } = require("../middleware/authentication");
const errorHandler = require("../middleware/errorHandler");

const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/users", UserController.registerNewUser);
router.use(authentication);
router.get("/users", UserController.getAllUsers);
router.put("/users", UserController.updateUser);
router.get("/users/profile", UserController.getDetailUser);
router.delete("/users/:id", UserController.deleteUser);


router.use(errorHandler);

module.exports = router;
