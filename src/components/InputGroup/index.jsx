import {TextInput, View,Text} from "react-native";
import style from "./style";

const InputGroup = (props) => {
    return (
        <View style={style.container} key={props.key}>
            <Text>{props.placeholder}</Text>
            <TextInput
                style={{paddingHorizontal:5,borderWidth:1,borderRadius:3}}
                onChangeText={props.onChange}
                {...props}
            />
        </View>
    )
}
export default InputGroup