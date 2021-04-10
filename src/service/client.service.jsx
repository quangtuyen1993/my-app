import { URL_CLIENT } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const ClientService = {
  fetchAll: async () => {
    var res = await AxiosAuthor.get(URL_CLIENT);
    return res.data;
  },
  changePassword: async ({id, username, role, password, confirmPassword }) => {
    try {
      console.info("request",id, username, role, password, confirmPassword)
      var res = await AxiosAuthor.put(URL_CLIENT+"/"+id, {
        username: username,
        role: role,
        password: password,
        confirmPassword: confirmPassword,
      });
      return res.data;
    } catch (err) {
      console.info(err)
      throw err.response.data;
    }
  },
  removeUser: async ({id }) => {
    try {
      var res = await AxiosAuthor.delete(URL_CLIENT+"/"+id, {
        id:id
      });
      return res.data;
    } catch (err) {
      console.info(err)
      throw err.response.data;
    }
  },
};
export default ClientService;
