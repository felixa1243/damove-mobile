import IonicIcon from "react-native-vector-icons/Ionicons";

const Icon = (props) => {
    return (
        <IonicIcon name={props.icon} size={24 || props.size} color={props.color}
                     style={props.style}
        />
    )
}

export default Icon;