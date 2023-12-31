import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {AddMovie, EditMovie, Home} from "../screens";

const Stack = createStackNavigator()
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{...TransitionPresets.ModalTransition}}>
                <Stack.Screen name={"Home"}
                              component={Home}/>
                <Stack.Screen name={"AddMovie"}
                              component={AddMovie}/>
                <Stack.Screen name={"EditMovie"}
                              component={EditMovie}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;