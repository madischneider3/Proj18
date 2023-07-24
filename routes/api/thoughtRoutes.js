const router = require("express").Router();
const {
  getThoughts,
  getIdvThought,
  createThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getIdvThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;