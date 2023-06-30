import {FlatList, Text, View} from "react-native";
import {MovieService} from "../../service/movieService";
import {useQuery} from "react-query";

const Home = () => {
    let {data, isLoading, error} = useQuery("getAllMovies", MovieService.getAllMovies)
    data = data?.data
    const RenderMovies = ({movies}) => {
        return (
            <View style={{
                marginVertical: 9,
                backgroundColor: 'white',
                marginHorizontal: 20,
                padding: 5,
                borderRadius: 5,
                elevation: 5
            }}>
                <Text style={{color: "black", fontWeight: "bold",marginTop:3}}>{movies.title}</Text>
                <Text style={{marginTop:2}}>{movies.director}</Text>
                <View style={{flexDirection: "row",width:"50%",marginTop:5}}>
                    {
                        movies.genres.map(genre =>
                            (
                                <Text
                                    style={{color:"gray",marginHorizontal:3}}
                                    key={genre.name}>
                                    {genre.name}
                                </Text>
                            )
                        )
                    }
                </View>
            </View>
        )
    }
    return (
        <View style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#fefefe'
        }}>
            <FlatList data={data?.data}
                      renderItem={(data) => <RenderMovies movies={data.item}/>}
                      keyExtractor={(data) => {
                          return data.id
                      }}
            />
        </View>
    );
};

export default Home;