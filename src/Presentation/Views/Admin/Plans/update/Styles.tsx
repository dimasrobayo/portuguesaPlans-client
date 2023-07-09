import { StyleSheet } from 'react-native'

const AdminCategoryUpdateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        top: '5%'
    },
    logoImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 2,
        alignSelf: 'center'
    },
    form: {
        width: '100%',
        height: '45%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left:20,
        right:20
    },
});

export default AdminCategoryUpdateStyles;