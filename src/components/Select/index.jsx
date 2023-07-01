import {Text, TouchableOpacity} from "react-native";
import {useState} from "react";

const Select = ({text, onPress, ...props}) => {
    const [isActive, setActive] = useState(false)
    return (
        <TouchableOpacity
            onPress={() => {
                setActive(!isActive)
                return onPress(isActive)
            }
            }
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                elevation: 1,
                marginHorizontal: 3,
                backgroundColor: isActive ? "cyan" : "white"
            }}
            {...props}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    );
};

export default Select;