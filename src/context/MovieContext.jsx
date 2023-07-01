import {createContext, useMemo, useReducer} from "react";
import {movieReducer, movieState} from "../screens/AddMovie/constant/AddReducer";

export const MovieContext = createContext(null)
export const MovieContextProvider = ({children}) => {
    const [movie, dispatch] = useReducer(movieReducer, movieState)
    const value = useMemo(() => ({movie, dispatch}), [movie])
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}