import request from "../request";

export const fetchMenuList = (data: object) => {
  return request({
    url: "admin/menu/list",
    method: "post",
    data,
  });
};
