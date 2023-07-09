import { StyleSheet } from "react-native";

const AdminProductUpdateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 15
    },
    image: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
        borderRadius: 40,
        borderColor: '#fff',
        borderWidth: 2,
        alignSelf: 'center',
        margin: 5
    },
    form: {
        backgroundColor: 'white',
        height: '70%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 0
    },
    categoryInfo: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCategory: {
        width: 50,
        height: 50
    },
    textCategory: {
        color: 'gray',
        fontSize: 17,
        fontWeight: 'bold'
    },
    buttonContainer: {
        marginTop: 80
    },
})

export default AdminProductUpdateStyles;