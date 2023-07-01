import {ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import {MovieService} from "../../service/movieService";
import {useQuery} from "react-query";
import React, {useCallback, useEffect, useState} from "react";
import ActionBar from "../../components/ActionBar";

const Home = (props) => {
    let {data, isLoading, error, refetch} = useQuery("getAllMovies", MovieService.getAllMovies)
    data = data?.data
    const [refresh, setRefresh] = useState(false)
    const onRefresh = useCallback(() => {
        setRefresh(true)
        refetch().then(() => setRefresh(true)).finally(() => setRefresh(false))
    }, [])
    if (isLoading) {
        return (
            <ActivityIndicator
                color={"blue"}
                size={"large"}
            />
        )
    }
    if (error) {
        return (
            <View>
                <Text>An error occured..</Text>
            </View>
        )
    }
    const RenderMovies = ({movies}) => {
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
    return (
        <View style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#fefefe'
        }}>
            {
                data?.data.length > 0 ?
                    <FlatList data={data?.data}
                              renderItem={(data) => <RenderMovies movies={data.item}/>}
                              keyExtractor={(data) => {
                                  return data.id
                              }}
                              refreshControl={(<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>)}
                    /> : (
                        <View style={{justifyContent: "center", width: "100%", height: "100%", alignItems: "center"}}>
                            <Text style={{fontSize: 20, color: "gray"}}>Movie is Empty Right Now...</Text>
                        </View>
                    )
            }
            <ActionBar onPress={() => props.navigation.navigate("AddMovie")}
            />
        </View>
    );
};

export default Home;