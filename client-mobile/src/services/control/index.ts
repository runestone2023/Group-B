import instance from "../../auth";
const API_URL = "/control/";

const control = async (auto: boolean) => {
  return await instance.post(API_URL, {
    auto,
  });
};

export const controlService = {
  control,
};
