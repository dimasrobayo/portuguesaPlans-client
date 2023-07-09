import React from 'react'
import { StyleSheet } from 'react-native'
import { MyColor } from '../../../../theme/AppTheme';

const AdminOrderDetailStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    products: {
        width: '100%',
        height: '45%'
    },
    info: {
        width: '100%',
        height: '55%',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 15,
    },
    infoText: {
        flex: 1
    },
    infoTitle: {
        color: 'black',
        fontWeight: 'bold'
    },
    infoDescription: {
        color: 'gray',
        fontSize: 13,
        marginTop: 3
    },
    infoImage: {
        width: 25,
        height: 25
    },
    dropDown: {
        marginTop: 10
    },
    totalInfo: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    total: {
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        width: '50%'
    }
});

export default AdminOrderDetailStyles;
