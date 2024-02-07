const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User list");
});

router.get("/new", (req, res) => {
  res.send("User New Form");
});

router.post("/", (req, res) => {
  res.send("Create user");
});


/* 
router.get('/:id', (req, res) => {
  res.send(`Update User With ID ${req.params.id}`)
});

router.put('/:id', (req, res) => {
  res.send(`Get User With ID ${req.params.id}`)
});

router.delete('/:id', (req, res) => {
  res.send(`Delete User With ID ${req.params.id}`)
});
*/

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user.name);;
    res.send(`Update User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Get User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

const users = [{ name: "Ida" }, { name: "Juho" }]
router.param('id', (req, res, next, id) => {
  req.user = users[id];
  next();
});

module.exports = router;
