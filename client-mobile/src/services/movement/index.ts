import instance from "../../auth";
const API_URL = "/move/";

const drive = async (com: number) => {
  return await instance.post(API_URL + "drive", {
    com,
  });
};

const grab = async (grab: boolean) => {
  return await instance.post(API_URL + "drive", {
    grab,
  });
};

export const moveService = {
  drive,
  grab
};
