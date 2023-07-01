import {TouchableOpacity, View} from "react-native";
import Icon from '../Icon/index'
import style from "./style";

const ActionBar = (props) => {
    return (
        <TouchableOpacity
            style={style.container}
            onPress={props.onPress}>
            <View>
                <Icon icon={'add'} color={'white'}/>
            </View>
        </TouchableOpacity>
    )
}
export default ActionBar