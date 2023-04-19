
export type RawProductObjectType = {
    Description: string,
    Price: number,
    ProductIndex: number,
    VariationID: string,
    VariationName: string,
    ProductName: string,
}

export type BasketProductObjectType = {
    Description: string,
    Price: number,
    ProductIndex: number,
    VariationID: string,
    VariationName: string,
    qty: number;
    varQty: number;
    ProductName: string;
    productBaksetUnqKey: string;
}

export type ShoppingCartFuncContextType = {
    cartProducts: BasketProductObjectType[] ,
    funcs:any ,
    setCartProducts: React.Dispatch<React.SetStateAction<BasketProductObjectType[]>> ,
    isKit: boolean ,
    setIsKit: React.Dispatch<React.SetStateAction<boolean>> ,
    kitAmount: number ,
    setKitAmount: React.Dispatch<React.SetStateAction<number>> ,
    total:number ,
    typeOfQuerry:number ,
    setTypeOfQuerry: React.Dispatch<React.SetStateAction<number>>,
  }