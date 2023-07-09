import { StyleSheet } from "react-native";
import { MyColor } from "../../../theme/AppTheme";

const ClientShoppingBagStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    totalToPay: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    totalInfo: {
        alignItems: 'center'
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: MyColor.success
    },
    buttonAdd: {
        width: '50%'
    }
});

export default ClientShoppingBagStyles;