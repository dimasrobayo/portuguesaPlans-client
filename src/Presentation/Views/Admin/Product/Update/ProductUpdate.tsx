import React, { useEffect } from 'react'
import styles from './Styles';
import useViewModel from './ViewModel';
import { 
    ActivityIndicator, 
    Image, 
    ScrollView, 
    Text, 
    ToastAndroid, 
    TouchableOpacity, 
    View 
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../Navigator/AdminProductNavigator';
import { CustomTextInput } from '../../../../Components/CustomTextInput';
import { RoundedButton } from '../../../../Components/RoundedButton';
import { MyColor, MyStyle } from '../../../../theme/AppTheme'

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductUpdateScreen'>{}

export const AdminProductUpdateScreen = ({navigation, route}: Props) => {
    const { category, product } = route.params
    const { 
        name, 
        description, 
        image1, 
        image2, 
        image3, 
        price, 
        responseMessage,
        loading,
        onChange,
        updateProduct
    } = useViewModel(product, category);

    useEffect(() => {
        if (responseMessage !== '') {
          ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
      }, [responseMessage])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity>
                    {
                        image1 == '' ? 
                            <Image
                                style={ styles.image }
                                source={ require('../../../../../../assets/image/image_new.png') }
                            />
                        :
                            <Image 
                                style={ styles.image }
                                source={{uri: image1}}
                            />
                    }
                </TouchableOpacity>
                
                <TouchableOpacity 
                >
                    {
                        image2 == '' ?
                            <Image
                                style={ styles.image }
                                source={ require('../../../../../../assets/image/image_new.png') }
                            />
                        :
                            <Image 
                                style={ styles.image }
                                source={{uri: image2}}
                            />
                    }
                </TouchableOpacity>

                <TouchableOpacity 
                >
                    {
                        image3 == '' ?
                            <Image
                                style={ styles.image }
                                source={ require('../../../../../../assets/image/image_new.png') }
                            />
                        :
                            <Image 
                                style={ styles.image }
                                source={{uri: image3}}
                            />
                    }
                </TouchableOpacity>
            </View>

            <View style={ styles.form }>
                <ScrollView>
                    <View style={styles.categoryInfo}>
                        <Image
                            style={styles.imageCategory}
                            source={ require('../../../../../../assets/image/menu.png') }
                        />
                        <Text style={styles.textCategory}>Categoria Seleccionada</Text>
                        <Text>{ category.name }</Text>
                    </View>

                    <CustomTextInput 
                        placeholder='Nombre de la producto'
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
                    
                    <CustomTextInput 
                        placeholder='Precio'
                        image={ require('../../../../../../assets/image/price.png')}
                        keyboardType='numeric'
                        property='price'
                        value={`${price}`}
                        onChangeText={ onChange }
                    />

                    <View style={styles.buttonContainer}>
                        <RoundedButton 
                            text='ACTUALIZAR PRODUCTO'
                            onPress={() => updateProduct()}
                        />
                    </View>
                </ScrollView>
            </View>

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
