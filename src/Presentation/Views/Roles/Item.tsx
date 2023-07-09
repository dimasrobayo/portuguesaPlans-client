import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../Navigator/MainStackNavigator';
import { Rol } from '../../../Domain/entities/Rol'
import { MyColor } from '../../theme/AppTheme';

interface Props{
    rol: Rol,
    height: number,
    width: number,
    navigation: StackNavigationProp<RootStackParamList, "Roles", undefined>
}

export const RolesItem = ({rol, height, width, navigation}: Props) => {
    return (
        <TouchableOpacity
            onPress={ () => {
                if (rol.name == 'GOBIERNO') {
                    navigation.replace('AdminTabsNavigator');
                }
                else if (rol.name == 'TECNICO') {
                    navigation.replace('DeliveryTabsNavigator');
                }
                else if (rol.name == 'USUARIO') {
                    navigation.replace('UserTabsNavigator');
                }
            }}
            style={{...Styles.container, width: width, height: height}}
        >
            <View style={Styles.imageContainer}>
                <Image 
                    style={Styles.image}
                    source={{uri: rol.image}}
                />
                <View style={Styles.titleContainer}>
                    <Text style={Styles.title}>{rol.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingHorizontal: 7
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 18,
        margin: 20
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    titleContainer: {
        height:50,
        backgroundColor: MyColor.primary,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    }
})