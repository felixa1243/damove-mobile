import {Text, TouchableOpacity, View} from "react-native";

const RenderMovies = ({movies,...props}) => {
    return (
        <TouchableOpacity style={{
            marginVertical: 9,
            backgroundColor: 'white',
            marginHorizontal: 20,
            padding: 5,
            borderRadius: 5,
            elevation: 5
        }}
                          onPress={() => props.navigation.navigate("EditMovie", {id: movies.id})}
        >
            <Text style={{color: "black", fontWeight: "bold", marginTop: 3}}>{movies.title}</Text>
            <Text style={{marginTop: 2}}>{movies.director}</Text>
            <Text style={{marginTop: 2}}>{movies.summary}</Text>
            <View style={{flexDirection: "row", width: "50%", marginTop: 5}}>
                {
                    movies.genres.map(genre =>
                        (
                            <Text
                                style={{color: "gray", marginHorizontal: 3}}
                                key={genre.name}>
                                {genre.name}
                            </Text>
                        )
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default RenderMovies;