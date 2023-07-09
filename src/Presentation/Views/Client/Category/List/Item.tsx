import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Category } from '../../../../../Domain/entities/Category';
import { UserStackParamList } from '../../../../Navigator/UserStackNavigator';
import styles from './Styles';

interface Props {
    category: Category,
    height: number,
    width: number,
    navigation: StackNavigationProp<UserStackParamList, "ClientCategoryListScreen", undefined>
}

export const ClientCategoryItem = ({category, height, width, navigation}: Props) => {
  return (
    <TouchableOpacity
        style={ { ...styles.container, height: height, width: width} }
        onPress={
            () => {
                navigation.navigate('ClientProductListScreen', { idCategory: category.id! })
            }
        }
    >
        
        <View style={ styles.imageContainer }>
            <Image 
                style={styles.image}
                source={{ uri: category.image}}
                />
            <View style={styles.titleContainer}>
                <Text style={ styles.title }>{ category.name }</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}