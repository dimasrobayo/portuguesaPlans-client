import { StyleSheet } from "react-native";

const ClientCategoryStyles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingHorizontal: 7,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        backgroundColor: 'white',
    },
    image: {
        flex: 1,
        // resizeMode: 'contain',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    titleContainer: {
        height: 70,
        backgroundColor: 'white',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    title: {
        color: 'black',
        fontSize: 25,
    }
});

export default ClientCategoryStyles;