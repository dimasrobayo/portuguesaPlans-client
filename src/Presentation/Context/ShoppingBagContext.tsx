import { useState, useEffect, createContext, useContext } from 'react'
import { Product } from '../../Domain/entities/Product'
import { GetShoppingBagUseCase } from '../../Domain/useCase/shopping_bag/GetShoppingBag'
import { SaveShoppingBagUseCase } from '../../Domain/useCase/shopping_bag/SaveShoppingBag'
import { GetByUserAddressUseCase } from '../../Domain/useCase/address/GetByUserAddress';
import { userContext } from './UseContext';
import { Address } from '../../Domain/entities/Address';

export interface ShoppingBagContextProps {
  shoppingBag: Product[],
  total: number,
  getShoppingBag(): Promise<void>,
  getTotal(): Promise<void>,
  saveItem(product: Product): Promise<void>,
  deleteItem(product: Product): Promise<void>,}

export const ShoppingBagContext = createContext({} as ShoppingBagContextProps);

export const ShoppingBagProvider = ({children}: any) => {
  const [shoppingBag, setShoppingBag] = useState<Product[]>([]);
  const [address, setAddress] = useState<Address[]>([]);
  const [total, setTotal] = useState(0.0);
  const {user} = useContext(userContext);

  useEffect(() => {
    getShoppingBag();
  }, [])

  useEffect(() => {
      getTotal();
  }, [shoppingBag])

  const getShoppingBag = async(): Promise<void> => {
    const result = await GetShoppingBagUseCase();
    setShoppingBag(result); // ASINCROZO
    
  }

  const getTotal = async (): Promise<void> => {
    setTotal(0);
    let totalPrice = 0;
    shoppingBag.forEach(product => {
      totalPrice = totalPrice + (product.quantity! * product.price);
    });
    setTotal(totalPrice);
  }

  const saveItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    if (index == -1) { // PRODUCTO NO HA SIDO AGREGADO A LA BOLSA COMPRAS -> INSERTARLO A LISTA
        shoppingBag.push(product);
    }
    else { // PRODUCTO YA HA SIDO AGREGADO A LA BOLSA DE COMPRAS -> EDITAR LA CANTIDAD
      shoppingBag[index].quantity = product.quantity;
    }
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppingBag();
  }

  const deleteItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    shoppingBag.splice(index, 1);
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppingBag();
  }

  return (
    <ShoppingBagContext.Provider 
      value={{
        total,
        shoppingBag,
        getShoppingBag,
        getTotal,
        saveItem,
        deleteItem
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  )
}
