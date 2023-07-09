import React, { useEffect, useState } from 'react';
import styles from './Styles';
import useViewModel from './ViewModel';
import { Image, ScrollView, Text, TouchableOpacity, View, KeyboardType, ToastAndroid, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MyColor, MyStyle } from '../../../../theme/AppTheme';
import { RoundedButton } from '../../../../Components/RoundedButton';
import { CustomTextInput } from '../../../../Components/CustomTextInput';
import { ProductStackParamList } from '../../../../Navigator/AdminProductNavigator';
import { ModalPickMultipleImage } from '../../../../Components/ModalPickMultipleImage';

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductCreateScreen'>{};

export const AdminProductCreateScreen = ({navigation, route}: Props) => {
    const { category } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [numberImage, setNumberImage] = useState(1);
    const { 
        name, 
        description, 
        responseMessage, 
        loading, 
        image1, 
        image2, 
        image3, 
        price, 
        onChange, 
        createProduct,
        pickImage,
        takePhoto
    } = useViewModel(category);

    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    return (
        <View style={styles.container}>
            <Image 
                source= {require('../../../../../../assets/image/plans.jpg')} 
                style= { styles.imageBackground }
            />
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setNumberImage(1)
                        setModalVisible(true)
                    }}
                >
                    {
                        image1 == ''
                        ? <Image
                        style={ styles.image }
                        source={ require('../../../../../../assets/image/image_new.png') }
                        />
                        : <Image 
                            source={{ uri: image1 }}
                            style={ styles.image }
                        />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setNumberImage(2)
                        setModalVisible(true)
                    }}
                >
                    {
                        image2 == ''
                        ? <Image
                        style={ styles.image }
                        source={ require('../../../../../../assets/image/image_new.png') }
                        />
                        : <Image 
                            source={{ uri: image2 }}
                            style={ styles.image }
                        />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setNumberImage(3)
                        setModalVisible(true)
                    }}
                >
                    {
                        image3 == ''
                        ? <Image
                        style={ styles.image }
                        source={ require('../../../../../../assets/image/image_new.png') }
                        />
                        : <Image 
                            source={{ uri: image3 }}
                            style={ styles.image }
                        />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <ScrollView>
                    <View style={styles.categoryInfo}>
                        <Image 
                            style={styles.imageCategory}
                            source={ require('../../../../../../assets/image/menu.png')}
                        />
                        <Text style={styles.textCategory}>Categoria Seleccionada</Text>
                        <Text>{category.name}</Text>
                    </View>

                    <CustomTextInput 
                        placeholder='Nombre del producto'
                        image={ require('../../../../../../assets/image/categories.png') }
                        keyboardType='default'
                        property='name'
                        value={name}
                        onChangeText={ onChange }
                    />

                    <CustomTextInput 
                        placeholder='Descripción'
                        image={ require('../../../../../../assets/image/description.png')}
                        keyboardType='default'
                        property='description'
                        value={description}
                        onChangeText={ onChange }
                    />

                    <CustomTextInput 
                        placeholder='Precio'
                        image={ require('../../../../../../assets/image/price.png')}
                        keyboardType='numeric'
                        property='price'
                        value={price}
                        onChangeText={ onChange }
                    />

                <View style={styles.buttonContainer}>
                    <RoundedButton 
                        text='CREAR PRODUCTO'
                        onPress={() => createProduct()}
                    />
                </View>
                </ScrollView>
            </View>

            <ModalPickMultipleImage
                openGallery={ pickImage }
                openCamera={ takePhoto }
                modalUseState={ modalVisible }
                setModalUseState={ setModalVisible }
                numberImage={ numberImage }
            />

            {
            loading && 
            <ActivityIndicator 
                style={MyStyle.loading} 
                size="large" 
                color={ MyColor.primary }  
            />
            }
        </View>
    )
}
