import axios from "axios";
import https from "https";
import { dataCenterInURL, dataCenterConverter, Console } from "./utils.js";

export const api = async (data, url) => {
  data.append("secret", body.secret);
  data.append("userKey", body.userKey);

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  const config = {
    method: "post",
    url: `https://accounts.${dataCenterInURL(body.dataCenter)}.gigya.com${url}`,
    headers: {
      ...data.getHeaders(),
    },
    data: data,
    httpsAgent: agent,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (e) {
    Console.error(e);
  }
};

export const etlAPI = async (data, url, fromMaster) => {
  data.append("secret", body.secret);
  data.append("userKey", body.userKey);

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  const config = {
    method: "post",
    url: `https://idx.${fromMaster 
      ? 'eu1' 
      : dataCenterConverter(body.dataCenter)
    }.gigya.com${url}`,
    headers: {
      ...data.getHeaders(),
    },
    data: data,
    httpsAgent: agent,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (e) {
    Console.error(e);
  }
};
