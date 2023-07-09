import React, { useEffect, useState } from 'react'
import styles from './Styles';
import useViewModal from './ViewModel';
import { RoundedButton } from '../../../Components/RoundedButton';
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
import { CustomTextInput } from '../../../Components/CustomTextInput';
import { ModalPickImage } from '../../../Components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigator/MainStackNavigator';
import { MyColor } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'>{};

export const ProfileUpdateScreen = ({navigation, route}: Props) => {
    const { user } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const { 
        name, 
        lastname, 
        image,
        phone, 
        errorMessage, 
        successMessage,
        onChange, 
        update,
        pickImage,
        takePhoto,
        loading,
    } = useViewModal(user);

    useEffect(() => {
        if(Platform.OS == 'android' && errorMessage){
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }else{
            
        }
    }, [errorMessage]);

    useEffect(() => {
        if(Platform.OS == 'android' && successMessage){
            ToastAndroid.show(successMessage, ToastAndroid.LONG)
        }else{
            
        }
    }, [successMessage])

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source= {require('../../../../../assets/image/city.jpg')} 
                style= { styles.imageBackground }
            />

            <View style= { styles.logoContainer }>
                <TouchableOpacity onPress={ () => setModalVisible(true) }>
                    {
                        image == '' ?
                            <Image 
                                source={{ uri: user?.image }}
                                style={ styles.logoImage }
                            />
                        :
                            <Image 
                                source={{ uri: image }}
                                style={ styles.logoImage}
                            />

                    }
                </TouchableOpacity>

                <Text style={ styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>

            <View style= { styles.form }>
                <ScrollView>
                    <Text style={ styles.formText }>ACTUALIZAR</Text>

                    <CustomTextInput 
                        image = {require('../../../../../assets/image/user.png')}
                        placeholder = 'Nombres'
                        keyboardType = 'default'
                        property='name'
                        value = { name }
                        onChangeText = { onChange }
                    />

                    <CustomTextInput 
                        image = {require('../../../../../assets/image/my_user.png')}
                        placeholder = 'Apelledos'
                        keyboardType = 'default'
                        property='lastname'
                        value = { lastname }
                        onChangeText = { onChange }
                    />

                    <CustomTextInput 
                        image = {require('../../../../../assets/image/phone.png')}
                        placeholder = 'Telefono'
                        keyboardType = 'numeric'
                        property='phone'
                        value = { phone }
                        onChangeText = { onChange }
                    />

                    <View style={{ marginTop: 30 }}>
                        <RoundedButton 
                            text='ACTUALIZAR'
                            onPress={ () => update() }
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