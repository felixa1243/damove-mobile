import {MovieContext} from "../../context/MovieContext";
import {FormList} from "./constant/formList";
import {Form} from "../../components";
import {useContext} from "react";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {useMutation, useQuery} from "react-query";
import {MovieService} from "../../service/movieService";
import Select from "../../components/Select";
import {useNavigation} from "@react-navigation/native";

const AddMovie = () => {
    const movieContext = useContext(MovieContext)
    const navigation = useNavigation()
    let {data, isLoading, error} = useQuery("getGenres", MovieService.getGenres)
    data = data?.data?.data
    const mutation = useMutation("addMovie", {
        mutationFn: MovieService.saveMovie
    })
    if (isLoading) {
        return (
            <ActivityIndicator
                size={"large"}
                color={"cyan"}/>
        )
    }
    if (error) {
        return (
            <View>
                <Text>An error occured..</Text>
            </View>
        )
    }
    if (mutation.isSuccess) {
        navigation.navigate("Home", {refetch: true})
        movieContext.dispatch("RESET")
    }
    return (
        <View>
            <Form
                formList={FormList}
                state={movieContext.movie}
                dispatch={movieContext.dispatch}
            />
            {
                data && data.length > 0 ? (
                    <View style={{flexDirection: "row"}}>
                        {
                            data.map(item => (
                                <Select
                                    text={item.name}
                                    key={item.name}
                                    onPress={(isActive) => {
                                        !isActive ? movieContext.dispatch({type: "ADD_GENRE", payload: item.name})
                                            :
                                            movieContext.dispatch({type: "REMOVE_GENRE", payload: item.name})
                                    }}
                                />
                            ))
                        }
                    </View>
                ) : (
                    <View>
                        <Text>Add genre:</Text>
                    </View>
                )
            }
            {
                mutation.isError && (
                    <Text style={{
                        color: "red",
                        margin: 7
                    }}>{mutation?.error.response.data.message.replace("\[||\]", "")}</Text>
                )
            }
            <View style={{width: "100%", justifyContent: "center", marginTop: 10, alignItems: "center"}}>
                <TouchableOpacity
                    onPress={() => {
                        mutation.mutate(movieContext.movie)
                    }
                    }
                    style={{backgroundColor: "red", width: "80%", padding: 5, borderRadius: 5, alignItems: "center"}}
                >
                    <Text style={{color: "white"}}>Add movies</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddMovie;