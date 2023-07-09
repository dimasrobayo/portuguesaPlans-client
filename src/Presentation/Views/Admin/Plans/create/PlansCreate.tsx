import React, { useEffect, useState } from 'react'
import styles from './Styles';
import { 
    ActivityIndicator, 
    Image, 
    SafeAreaView, 
    ScrollView, 
    ToastAndroid,
    Platform,
    Text, 
    TouchableOpacity,
    View 
} from 'react-native'
import { CustomTextInput } from '../../../../Components/CustomTextInput';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../Components/RoundedButton';
import { ModalPickImage } from '../../../../Components/ModalPickImage';
import { MyColor, MyStyle } from '../../../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../Navigator/MainStackNavigator';

interface Props extends StackScreenProps<RootStackParamList, 'AdminPlansCreateScreen'>{};

export const AdminPlansCreateScreen = ({navigation, route}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const {
        name, 
        description, 
        image, 
        responseMessage, 
        loading,
        onChange,
        pickImage,
        takePhoto,
        createCategory,
    } = useViewModel()

    useEffect(() => {
        if(Platform.OS == 'android' && responseMessage){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }else{
            
        }
    }, [responseMessage])

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source= {require('../../../../../../assets/image/plans.jpg')} 
                style= { styles.imageBackground }
            />

            <View style= { styles.logoContainer }>
                <TouchableOpacity onPress={ () => setModalVisible(true) }>
                    {
                        image == '' ?
                            <Image 
                                source={ require('../../../../../../assets/image/image_new.png') }
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

            <View style={styles.form}>
                <ScrollView>
                    <Text style={ styles.formText }>NUEVA PLAN</Text>

                    <CustomTextInput 
                        placeholder='Nombre del Plan'
                        image={ require('../../../../../../assets/image/categories.png')}
                        keyboardType='default'
                        value={name}
                        onChangeText={ onChange }
                        property='name'
                    />

                    <CustomTextInput 
                        placeholder='Descripción del Plan'
                        image={ require('../../../../../../assets/image/description.png')}
                        keyboardType='default'
                        value={description}
                        onChangeText={ onChange }
                        property='description'
                    />

                    <View style={{ marginTop: 30 }}>
                        <RoundedButton 
                            text='REGISTRAR'
                            onPress={ () => createCategory() }
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
                        style={MyStyle.loading} 
                        size="large" 
                        color={MyColor.primary} 
                    />
                :
                    <View></View>
            }
        </SafeAreaView>
    )
}
