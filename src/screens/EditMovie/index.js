import {Text, TouchableOpacity, View} from "react-native";
import {useMutation, useQuery} from "react-query";
import {MovieService} from "../../service/movieService";
import {useEffect, useState} from "react";
import InputGroup from "../../components/InputGroup";
import Select from "../../components/Select";

const EditMovie = (props) => {
    const {id} = props.route.params;

    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [summary, setSummary] = useState("");
    const [genresName, setGenresName] = useState([]);
    let {data, isLoading, error} = useQuery("getMoviesById", () => MovieService.getById(id));

    data = data?.data;

    useEffect(() => {
        if (data) {
            setTitle(data?.data.title);
            setDirector(data?.data.director);
            setSummary(data?.data.summary);
        }
    }, [data]);

    const update = useMutation("editMovie", (data) => {
        return MovieService.updateMovie(id, data)
    });
    const deleteMovie = useMutation("deleteMovie", () => MovieService.deleteMovie(id))

    const formList = [
        {
            onChange: (text) => setTitle(text),
            value: title,
            placeholder: "Title"
        },
        {
            onChange: (text) => setDirector(text),
            value: director,
            placeholder: "Director"
        },
        {
            onChange: (text) => setSummary(text),
            value: summary,
            placeholder: "Summary"
        }
    ];
    let {
        data: genreDatas
    } = useQuery("getGenres", MovieService.getGenres);
    genreDatas = genreDatas?.data?.data;

    useEffect(() => {
        if (update.isSuccess || deleteMovie.isSuccess) {
            props.navigation.navigate("Home");
        }
    }, [update.isSuccess, deleteMovie.isSuccess]);
    const postData = {title, director, summary, genresName}
    return (
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
            {formList.map(item => (
                <InputGroup
                    key={item.placeholder}
                    onChange={item.onChange}
                    value={item.value}
                    placeholder={item.placeholder}
                />
            ))}
            {genreDatas && genreDatas.length > 0 ? (
                <View style={{flexDirection: "row"}}>
                    {genreDatas.map(item => (
                        <Select
                            text={item.name}
                            key={item.name}
                            onPress={(isActive) => {
                                !isActive
                                    ? setGenresName(prevState => [...prevState, item.name])
                                    : setGenresName(prevState => prevState.filter(genre => genre.name !== item.name));
                            }}
                        />
                    ))}
                </View>
            ) : (
                <View>
                    <Text>Add genre:</Text>
                </View>
            )}
            {
                update.error && (
                    <Text style={{color: "red", margin: 7}}>{update?.error.response.data.message}</Text>
                )
            }
            <View style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 10,
                alignItems: "center",
                flexDirection: "row",
                padding: 5
            }}>
                <TouchableOpacity
                    onPress={async () => {
                        await update.mutate({...postData, genresName});
                    }}
                    style={{
                        backgroundColor: "blue",
                        width: "50%",
                        padding: 5,
                        borderRadius: 5,
                        alignItems: "center",
                        marginHorizontal: 3
                    }}
                >
                    <Text style={{color: "white"}}>Save movies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        await deleteMovie.mutate();
                    }}
                    style={{
                        backgroundColor: "red",
                        width: "50%",
                        padding: 5,
                        borderRadius: 5,
                        alignItems: "center",
                        marginHorizontal: 3
                    }}
                >
                    <Text style={{color: "white"}}>Delete movies</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default EditMovie;