import instance from "@/utils/instance";

const spaceXService = {
  getAllRocket: () => instance.get("/rockets"),
  getDetailByIdRocket: (payload: string) => instance.get(`/rockets/${payload}`)
};

export default spaceXService;
