import { useEffect, useState } from "react";
import { Bridge } from "../types";
import axios, { AxiosResponse } from "axios";

const useBridges = () => {
  const [bridges, setBridges] = useState<Bridge[] | undefined>();

  useEffect(() => {
    // TODO: setup axios with a baseUrl
    axios
      .get("http://localhost:8888/bridges/10")
      .then((response: AxiosResponse) => {
        setBridges(response.data);
      }); // TODO: catch()
  }, []);

  // TODO: add loading/error outputs
  return bridges;
};

export default useBridges;
