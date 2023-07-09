import React from 'react'
import { MyColor } from '../theme/AppTheme'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
    text: string,
    onPress: () => void
}

export const RoundedButton = ({text, onPress}: Props) => {
    return (
        <TouchableOpacity 
            style={ styles.roundedBotton }
            onPress={() => onPress()}
        >
            <Text style={ styles.textBotton }>{text}</Text>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundedBotton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 10,
    },
    textBotton: {
        color: 'white',
        fontWeight: 'bold'
    }
})
