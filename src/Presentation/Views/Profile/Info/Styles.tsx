import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: 'black',
        justifyContent: 'center', 
        alignItems: 'center'
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
        top: '15%'
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff'
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10
    },
    form: {
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    formInfo: {
        flexDirection: 'row',
        marginBottom: 25
    },
    formContent: {
        marginLeft: 15
    },
    formImage: {
        height: 40,
        width: 40
    },
    formTextDescription: {
        fontSize: 12,
        color: 'gray'
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    logout: {
        position: 'absolute',
        top: 35,
        right: 25
    },
    logoutImage: {
        width: 40,
        height: 40,
    }

});

export default ProfileInfoStyles;