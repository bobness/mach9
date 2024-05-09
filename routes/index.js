const express = require("express");
const router = express.Router();
const axios = require("axios");
const { parse } = require("csv-parse");

router.get("/import", async (req, res, next) => {
  let dataLength = 0;
  const { data } = await axios.get(
    "https://www.fhwa.dot.gov/bridge/nbi/2022/delimited/PA22.txt",
    { responseType: "stream" }
  );
  const promises = [];
  return data.pipe(
    parse({
      trim: true,
      columns: true,
      delimiter: ",",
      skip_empty_lines: true,
      relax_quotes: true,
    })
      .on("data", async (row) => {
        dataLength++;
        promises.push(
          req.client.query({
            text: `
            insert into bridges (longitude, latitude) values ($1::decimal, $2::decimal)
            on conflict do nothing
          `,
            values: [parseFloat(row.LONG_017), parseFloat(row.LAT_016)],
          })
        );
      })
      .on("end", async () => {
        await Promise.all(promises);
        req.client.release();
        return res.status(200).json(dataLength);
      })
  );
});

module.exports = router;
