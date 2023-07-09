import React, { useEffect } from 'react'
import styles from './Styles';
import useViewModel from './ViewModel';
import { RootStackParamList } from '../../Navigator/MainStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { RoundedButton } from '../../Components/RoundedButton';
import { CustomTextInput } from '../../Components/CustomTextInput';
import { Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView, ToastAndroid, Platform } from 'react-native';

interface Props extends StackScreenProps<RootStackParamList, 'Login'>{};

export const LoginScreen = ({navigation, route}: Props) => {
    const { email, password, onChange, Login, errorMessage, user } = useViewModel();

    useEffect(() => {
        if(Platform.OS === 'android' && errorMessage){
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }else{

        }
    }, [errorMessage])

    useEffect(() => {
      if(user?.id !== null && user?.id !== undefined && user?.id !== ''){
        if(user.roles?.length! > 1){
            navigation.replace('Roles');
        }else{
            navigation.replace('Roles');
        }
      }
    }, [user])
    
    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source= {require('../../../../assets/image/bg.jpg')} 
                style= { styles.imageBackground }
            />

            <View style= { styles.logoContainer }>
                <Image 
                    source={ require('../../../../assets/image/logo.png') }
                    style={ styles.logoImage }
                />

                <Text style={ styles.logoText}>Portuguesa</Text>
            </View>

                <ScrollView style= { styles.form }>
                    <Text style={ styles.formText }>INGRESAR</Text>
                    
                    <CustomTextInput
                        image = {require('../../../../assets/image/email.png')}
                        placeholder = 'Correo Electrónico'
                        keyboardType = 'email-address'
                        property='email'
                        onChangeText = { onChange }
                        value = { email }
                    />
                    
                    <CustomTextInput
                        image = {require('../../../../assets/image/password.png')}
                        placeholder = 'Contraseña'
                        keyboardType = 'default'
                        property='password'
                        onChangeText = { onChange }
                        value = { password }
                        secureTextEntry={ true }
                    />

                    <View style={{ marginTop: 30 }}>
                        <RoundedButton 
                            text='ENTRAR'
                            onPress={ () => Login() }
                        />
                    </View>

                    <View style={styles.formRegister}>
                        <Text>No tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.formRegisterText}>Registrate</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}