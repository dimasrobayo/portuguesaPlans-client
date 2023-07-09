import React, { useEffect, useState } from 'react';
import styles from './Styles';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { MyColor, MyStyle } from '../../../../theme/AppTheme';
import { RoundedButton } from '../../../../Components/RoundedButton';
import { ModalPickImage } from '../../../../Components/ModalPickImage';
import { CustomTextInput } from '../../../../Components/CustomTextInput';
import { PlansStackParamList } from '../../../../Navigator/AdminPlansNavigator'
import { ActivityIndicator, Image, SafeAreaView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

interface Props extends StackScreenProps<PlansStackParamList, 'AdminPlansUpdateScreen'>{};

export const AdminPlansUpdateScreen = ({navigation, route}: Props) => {
    const { category } = route.params;
    const { name, description, responseMessage, loading, image, onChange, takePhoto, pickImage, updateCategory } = useViewModel(category);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source= {require('../../../../../../assets/image/plans.jpg')} 
                style= { styles.imageBackground }
            />

            <View style= { styles.logoContainer }>
                <TouchableOpacity 
                    onPress={() => setModalVisible(true)}
                >
                    {
                    image == '' ? 
                    <Image
                        style={ styles.logoImage }
                        source={ require('../../../../../../assets/image/image_new.png') }
                    />
                    : 
                    <Image 
                        source={{ uri: image }}
                        style={ styles.logoImage }
                    />
                    }
                </TouchableOpacity>
            </View>

                <View style={ styles.form }>
                    <Text style={ styles.formText }>ACTUALIZAR CATEGORIA</Text>
    
                    <CustomTextInput 
                        placeholder='Nombre de la categoria'
                        image={ require('../../../../../../assets/image/categories.png')}
                        keyboardType='default'
                        property='name'
                        value={name}
                        onChangeText={ onChange }
                    />
                    <CustomTextInput 
                        placeholder='Descripcion'
                        image={ require('../../../../../../assets/image/description.png')}
                        keyboardType='default'
                        property='description'
                        value={description}
                        onChangeText={ onChange }
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <RoundedButton 
                        text='ACTUALIZAR CATEGORIA'
                        onPress={() => updateCategory()}
                    />
                </View>

                <ModalPickImage 
                    openGallery={ pickImage }
                    openCamera={ takePhoto }
                    modalUseState={ modalVisible }
                    setModalUseState={ setModalVisible }
                />

                {
                    loading && 
                    <ActivityIndicator 
                        style={MyStyle.loading} 
                        size="large" 
                        color={ MyColor.primary }  
                    />
                }
        </SafeAreaView>
    )
}
