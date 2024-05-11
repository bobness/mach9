const express = require("express");
const router = express.Router();

/* 
  TODO: Develop an API that exposes the processed data to frontend clients, 
  enabling operations like searching, filtering, and retrieving bridge information 
  based on various criteria.
*/

router.get("/:limit", async (req, res, next) => {
  const response = await req.client.query({
    text: "select * from bridges limit $1::integer",
    values: [Number(req.params.limit)],
  });
  return res.status(200).json(response.rows);
});

// router.get("/:bridge_id", async (req, res, next) => {
//   const response = await req.client.query({
//     text: "select * from bridges where id = $1::integer",
//     values: [parseInt(req.params.bridge_id)],
//   });
//   return res.status(200).json(response.rows[0]);
// });

module.exports = router;
