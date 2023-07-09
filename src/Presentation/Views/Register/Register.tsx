import React, { useEffect, useState } from 'react'
import styles from './Styles';
import useViewModal from './ViewModel';
import { RoundedButton } from '../../Components/RoundedButton';
import { 
    Text, 
    Image, 
    View, 
    SafeAreaView, 
    ScrollView, 
    ToastAndroid,
    Platform, 
    TouchableOpacity, 
    ActivityIndicator 
} from 'react-native';
import { CustomTextInput } from '../../Components/CustomTextInput';
import { ModalPickImage } from '../../Components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigator/MainStackNavigator';
import { MyColor } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'Register'>{};

export const RegisterScreen = ({navigation, route}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { 
        name, 
        lastname, 
        email, 
        image,
        phone, 
        password, 
        confirmpassword, 
        onChange, 
        register,
        errorMessage, 
        pickImage,
        takePhoto,
        loading,
        user
    } = useViewModal();

    useEffect(() => {
        if(Platform.OS == 'android' && errorMessage){
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }else{
            
        }
    }, [errorMessage])

    useEffect(() => {
        if(user?.id !== null && user?.id !== undefined){
          navigation.replace('UserTabsNavigator');
        }
    }, [user])
    

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source= {require('../../../../assets/image/bg.jpg')} 
                style= { styles.imageBackground }
            />

            <View style= { styles.logoContainer }>
                <TouchableOpacity onPress={ () => setModalVisible(true) }>
                    {
                        image == '' ?
                            <Image 
                                source={ require('../../../../assets/image/user_image.png') }
                                style={ styles.logoImage }
                            />
                        :
                            <Image 
                                source={{ uri: image }}
                                style={ styles.logoImage}
                            />

                    }
                </TouchableOpacity>

                <Text style={ styles.logoText}>Selecciona una Imagen</Text>
            </View>

            <View style= { styles.form }>
                <ScrollView>
                    <Text style={ styles.formText }>REGISTRARSE</Text>

                    <CustomTextInput 
                        image = {require('../../../../assets/image/user.png')}
                        placeholder = 'Nombres'
                        keyboardType = 'default'
                        property='name'
                        value = { name }
                        onChangeText = { onChange }
                    />

                    <CustomTextInput 
                        image = {require('../../../../assets/image/my_user.png')}
                        placeholder = 'Apelledos'
                        keyboardType = 'default'
                        property='lastname'
                        value = { lastname }
                        onChangeText = { onChange }
                    />

                    <CustomTextInput 
                        image = {require('../../../../assets/image/email.png')}
                        placeholder = 'Correo Electrónico'
                        keyboardType = 'email-address'
                        property='email'
                        value = { email }
                        onChangeText = { onChange }
                    />

                    <CustomTextInput 
                        image = {require('../../../../assets/image/phone.png')}
                        placeholder = 'Telefono'
                        keyboardType = 'numeric'
                        property='phone'
                        value = { phone }
                        onChangeText = { onChange }
                    />

                    <CustomTextInput 
                        image = {require('../../../../assets/image/password.png')}
                        placeholder = 'Contraseña'
                        keyboardType = 'default'
                        property='password'
                        value = { password }
                        onChangeText = { onChange }
                        secureTextEntry = { true }
                    />
                    
                    <CustomTextInput 
                        image = {require('../../../../assets/image/confirm_password.png')}
                        placeholder = 'Confirmar Contraseña'
                        keyboardType = 'default'
                        property='confirmpassword'
                        value = { confirmpassword }
                        onChangeText = { onChange }
                        secureTextEntry = { true }
                    />

                    <View style={{ marginTop: 30 }}>
                        <RoundedButton 
                            text='CONFIRMAR'
                            onPress={ () => register() }
                        />
                    </View>
                </ScrollView>
            </View>
            <ModalPickImage 
                openGallery={ pickImage }
                openCamera={ takePhoto }
                modalUseState={ modalVisible }
                setModalUseState={ setModalVisible }
            />
            {
                loading ?
                    <ActivityIndicator 
                        style={styles.loading} 
                        size="large" 
                        color={MyColor.primary} 
                    />
                :
                    <View></View>
            }
        </SafeAreaView>
    )
}