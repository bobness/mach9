import { useEffect, useState } from "react";
import { Bridge } from "../types";
import axios from "axios";

const useBridges = () => {
  const [bridges, setBridges] = useState<Bridge[] | undefined>();

  useEffect(() => {
    // TODO: setup axios with a baseUrl
    axios
      .get("http://localhost:8888/bridges/10")
      // FIXME typing
      .then((response: any) => {
        setBridges(response.rows); // TODO: use ... to create a new array if necessary
      }); // TODO: catch()
  }, []);

  // TODO: add loading/error outputs
  return bridges;
};

export default useBridges;
