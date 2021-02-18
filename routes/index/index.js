const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("I am alive")
  if (req.query.a == 'a') {
    res.end()
    res.write("And i still here")
  }
});

module.exports = router;