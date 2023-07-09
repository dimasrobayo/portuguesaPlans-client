import { StyleSheet } from 'react-native'

const ClientAddressMapStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    imageLocation: {
        height: 65,
        width: 65,
        justifyContent: 'center',
        position: 'absolute'
    },
    refPoint: {
        top: 40,
        width: '70%',
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#d4d4d4',
        paddingVertical: 4,
        borderRadius: 15
    },
    refPointText: {
        textAlign: 'center'
    },
    buttonRefPoint: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        width: '70%'
    }
});

export default ClientAddressMapStyles;