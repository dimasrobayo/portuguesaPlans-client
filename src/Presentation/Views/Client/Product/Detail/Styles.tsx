import { StyleSheet } from "react-native"

const ClientProductDetailStyles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'white' 
    },
    productImage: {
        width: '100%',
        height: '47%'
    },
    productDetail: {
        position: 'absolute',
        width: '100%',
        height: '55%',
        backgroundColor: 'white',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    productInfo: {
        padding: 30,
        flex: 1
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginTop: 15
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    descriptionTitle: {
        marginTop: 10,
        fontWeight: 'bold'
    },
    descriptionContent: {
        fontSize: 13,
        marginTop: 5
    },
    productActions: {
        flexDirection: 'row',
        height: 70,
        paddingHorizontal: 30
    },
    actionLess: {
        backgroundColor: '#3a3a3a',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15
    },
    actionAdd: {
        backgroundColor: '#3a3a3a',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15
    },
    actionText: {
        color: 'white',
        fontSize: 20
    },
    quantity: {
        backgroundColor: '#3a3a3a',
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
    },
    buttonAdd: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        position: 'absolute',
        top: 40,
        left: 15,
    },
    backImage: {
        height: 35,
        width: 35
    }
});

export default ClientProductDetailStyles;