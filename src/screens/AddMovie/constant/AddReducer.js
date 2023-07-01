export const movieState = {
    title: "",
    director: "",
    summary: "",
    genresName: []
}
export const movieReducer = (state = movieState, action) => {
    switch (action.type) {
        case "CHANGE_TITLE":
            return {
                ...state,
                title: action.payload
            }
        case "CHANGE_DIRECTOR":
            return {
                ...state,
                director: action.payload
            }
        case "CHANGE_SUMMARY":
            return {
                ...state,
                summary: action.payload
            }
        case "ADD_GENRE":
            return {
                ...state,
                genresName: [...state.genresName, action.payload]
            }
        case "REMOVE_GENRE":
            const genreName = action.payload;
            return {
                ...state,
                genresName: state.genresName.filter(item => item !== genreName)
            }
        case "RESET":
            return {
                title: "",
                director: "",
                summary: "",
                genresName: []
            }
    }
}