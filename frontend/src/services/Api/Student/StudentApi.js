import { axiosClient } from "../../../api/axios.js";
const StudentApi = {
  login: async (email, password) => {
    return await axiosClient.post("/login", { email, password });
  },

  getUser: async () => {
    return await axiosClient.get("/admin");
  },

  logout: async()=>{
     return await axiosClient.post("/logout");
  }
};

export default StudentApi;
