import {ActivityIndicator, RefreshControl, Text, TextInput, View} from "react-native";
import {MovieService} from "../../service/movieService";
import {useQuery} from "react-query";
import React, {useCallback, useEffect, useState} from "react";
import ActionBar from "../../components/ActionBar";
import ListMovies from "./ListMovies";

const Home = (props) => {
    const [query, setQuery] = useState('');
    let {data, isLoading, error, refetch} = useQuery('getAllMovies', MovieService.getAllMovies);
    if (data) {
        data = data.data
    }
    const [refresh, setRefresh] = useState(false);
    const onRefresh = useCallback(() => {
        setRefresh(true);
        refetch().then(() => setRefresh(false));
    }, [refetch]);

    let {data: searchData} = useQuery(['getByTitle', query], async () => MovieService.getByTitle(query));
    const [movies, setMovies] = useState(data)
    useEffect(() => {
        setMovies(query ? searchData?.data : data)
    }, [query])
    if (isLoading) {
        return (
            <ActivityIndicator
                color={'blue'}
                size={'large'}
            />
        );
    }
    if (error) {
        return (
            <View>
                <Text>An error occurred...</Text>
            </View>
        );
    }
    return (
        <View style={{flex: 1, height: '100%', backgroundColor: '#fefefe'}}>
            <TextInput
                style={{
                    borderWidth: 3,
                    borderColor: 'gray',
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    marginHorizontal: 8,
                }}
                placeholder={'Enter movie name'}
                onChangeText={(text) => setQuery(text)}
            />
            {
                movies?.data.length > 0 ? (
                        <ListMovies data={movies?.data}
                                    keyExtractor={(data) => data.id.toString()}
                                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
                                    {...props}/>
                    )

                    : (
                        <View
                            style={{
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{fontSize: 20, color: 'gray'}}
                            >Movie is Empty Right Now...</Text>
                        </View>
                    )
            }
            <ActionBar onPress={() => props.navigation.navigate('AddMovie')}/>
        </View>
    );
};


export default Home;