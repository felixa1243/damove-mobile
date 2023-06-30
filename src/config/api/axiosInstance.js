import axios from "axios";
import Constants from "expo-constants/src/Constants";

const {manifest} = Constants
const axiosInstance = axios.create({
    baseURL: `http://${manifest.debuggerHost.split(':').shift()}:8000/api`,
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInstance