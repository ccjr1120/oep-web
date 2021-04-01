import request from "./request";
import qs from "qs";

export const fetchByBody = (url: String, data?: any) => {
  return request({
    url: url + "",
    method: "post",
    data,
  });
};

export const fetchByParam = (url: String, data: any) => {
  return request({
    url: url + `?${qs.stringify(data)}`,
    method: "post",
  });
};
