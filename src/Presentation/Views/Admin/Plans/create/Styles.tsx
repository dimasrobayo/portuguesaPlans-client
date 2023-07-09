import { StyleSheet } from "react-native";
import { MyColor } from "../../../../theme/AppTheme";

const AdminCategoryCreateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    imageContainer: {
        paddingTop: 50,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    logoText: {
        color: MyColor.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10
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
});

export default AdminCategoryCreateStyles;