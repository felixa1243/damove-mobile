import axiosInstance from "../config/api/axiosInstance";

export const MovieService = {
    getAllMovies: async () => {
        return await axiosInstance.get("/movies")
    },
    saveMovie: async (data)=>{
        return await axiosInstance.post("/movies",data)
    },
    deleteMovie: async (id)=>{
        return await axiosInstance.delete(`/movies/${id}`)
    },
    updateMovie: async (id,data)=>{
        return await axiosInstance.put(`/movies/${id}`,data)
    }
}