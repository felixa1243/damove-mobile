import {FlatList} from "react-native";
import RenderMovies from "./RenderMovies";

const ListMovies = ({data, ...props}) => {
    return (
        <FlatList data={data} renderItem={(data) => <
            RenderMovies
            movies={data.item}
            {...props}/>
        }/>
    );
};

export default ListMovies;