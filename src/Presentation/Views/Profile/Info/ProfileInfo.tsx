import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import useViewModel from './ViewModel';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigator/MainStackNavigator';
import styles from './Styles'
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../Components/RoundedButton';

export const ProfileInfoScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { user, removeUserSession } = useViewModel();
    
    useEffect(() => {
      if(user.id === ''){
        navigation.replace('Login');
      }
    }, [user])
    

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source= {require('../../../../../assets/image/bg.jpg')} 
                style= { styles.imageBackground }
            />

            <TouchableOpacity
                style={ styles.logout }
                onPress={() => {
                    removeUserSession();
                }}
            >
                <Image 
                    source= {require('../../../../../assets/image/logout.png')} 
                    style= {styles.logoutImage}
                />
            </TouchableOpacity>

            <View style= { styles.logoContainer }>
                { 
                    user?.image !== '' 
                    && 
                    <Image 
                        source={{ uri: user?.image }}
                        style={ styles.logoImage }
                    />
                }
            </View>

            <View style = { styles.form }>
                <View style = {styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/image/user.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{user?.name} {user?.lastname}</Text>
                        <Text style={styles.formTextDescription}>Nombre del usuario</Text>
                    </View>
                </View>

                <View style = {styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/image/email.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{user?.email}</Text>
                        <Text style={styles.formTextDescription}>Email del usuario</Text>
                    </View>
                </View>

                <View style = {styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/image/phone.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{user?.phone}</Text>
                        <Text style={styles.formTextDescription}>Telefono del usuario</Text>
                    </View>
                </View>

                <RoundedButton 
                    text='Actualizar'
                    onPress={() => {
                        navigation.navigate('ProfileUpdateScreen', { user: user! })
                    }}
                />
            </View>
        </SafeAreaView>
    )
}