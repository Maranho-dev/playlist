const express = require("express");
const Controller = require("./controller/Controller");
const router = express.Router();

router.get("/", Controller.index);
router.get("/:id", Controller.show);
router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);

router.post("/:id/musica", Controller.addMusic);
router.delete("/:id/musica/:id", Controller.removeMusic);

module.exports = router;
