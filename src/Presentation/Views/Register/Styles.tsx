import { StyleSheet } from "react-native";
import { MyColor } from "../../theme/AppTheme";

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '75%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    formRegisterText: {
        fontStyle: 'italic',
        color: MyColor.primary,
        borderBottomWidth: 1,
        borderBottomColor: MyColor.primary,
        fontWeight: 'bold',
        marginLeft: 10
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        top: '5%'
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 2
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

export default RegisterStyles;