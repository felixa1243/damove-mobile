import {StatusBar, StyleSheet, View} from 'react-native';
import AppNavigator from "./src/navigations/AppNavigator";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./src/config/api/queryClient";

export default function App() {
    return (
        <View style={styles.container}>
            <QueryClientProvider client={queryClient}>
                <StatusBar/>
                <AppNavigator/>
            </QueryClientProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});