const express = require("express");
const router = express.Router();

router.get("/:bridge_id", async (req, res, next) => {
  const response = await req.client.query({
    text: "select * from bridges where id = $1::integer",
    values: [parseInt(req.params.bridge_id)],
  });
  return res.status(200).json(response.rows[0]);
});

module.exports = router;
