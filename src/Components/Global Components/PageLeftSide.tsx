//Importin React hooks
import { useContext, useState } from 'react'

//Importing Font Awesome and Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { ShoppingCartFunc } from '../Context Components/ShoppingCartFuncContext'

//Importing types and interfaces
import {
    RawProductObjectType,
    BasketProductObjectType,
} from '../../Types/ShoppingCartTypes'

//Importing Components
import ProductSearchBar from '../Small Components/ProductDisplaySearchBar'
import BasketProductsDisplay from '../Small Components/BasketItemsDisplay'

export default function PageLeftSide(props: any) {
    const [searchQuerry, setSearchQuerry] = useState(' ')
    //Object destructuring from component's props
    const { productsList } = props

    //Getting the context data from the context component
    //Destructuring the object, for a best practice use
    const {
        cartProducts,
        funcs: { addProduct, removeProduct, handleDirectAmountInput },
    } = useContext(ShoppingCartFunc)

    //Re-assigning the functions for the basked functionality features.
    const handleAddProduct = (product: RawProductObjectType) => {
        addProduct(product)
    }
    const handleRemoveProduct = (product: BasketProductObjectType) => {
        removeProduct(product)
    }

    const handleUserDirectInput = (
        product: BasketProductObjectType,
        amount: number
    ) => {
        handleDirectAmountInput(product, amount)
    }

    //Setting the search filtering function
    //It takes the user input and filters out the array accordingly
    let filterFunc = []
    filterFunc =
        searchQuerry !== ' '
            ? productsList.filter((product: RawProductObjectType) =>
                  product.ProductName.toLowerCase().includes(
                      searchQuerry.toLowerCase()
                  )
              )
            : ' '

    return (
        <>
            <div
                className="page-left-side-wrapper block py-6 bg-white border-white border-slate-300 rounded-sm text-sm shadow-2xl
                focus:outline-none 
                sm:px-5 sm:py-3 sm:text-xs
                md:px-8 md:py-4 md:text-sm
                lg:px-12 lg:py-6 lg:text-base"
            >
                {props.children}
                <div className="page-left-side-main-section">
                    {/* <= //The input field the user types in */}
                    <div className="page-left-side-search-bar-icon-wrapper">
                        <input
                            aria-label="Search bar"
                            className="page-left-side-search-bar block px-8 py-2 pr-40 bg-white border-white  rounded-sm text-sm shadow-md
                focus:outline-none"
                            type="text"
                            placeholder="Product name here..."
                            onChange={(e) => setSearchQuerry(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="icon magnifying-glass-icon-page-left-side  py-0"
                        />
                    </div>
                    <div className="search-result-container-scroll">
                        {Array.isArray(filterFunc) && searchQuerry !== ''
                            ? filterFunc
                                  .slice(0, 6)
                                  .map((product) => (
                                      <ProductSearchBar
                                          product={product}
                                          addProduct={handleAddProduct}
                                          key={product.ProductIndex}
                                      />
                                  ))
                            : ' '}
                    </div>
                </div>
                <div className="line line-2"></div>
                <div className="page-left-side-basket-section">
                    <h2 className="text-cardText font-bold text-primary-color mb-4 cursor-default">
                        Your products :
                    </h2>

                    <div className="page-left-side-bottom-section">
                        <div className="basket-scroll-section">
                            {cartProducts.filter(
                                (product) =>
                                    product.qty > 0 && product.varQty > 0
                            ).length != 0 ? (
                                cartProducts.map((product) =>
                                    product.qty > 0 && product.varQty > 0 ? (
                                        <BasketProductsDisplay
                                            key={product.productBaksetUnqKey}
                                            product={product}
                                            handleRemoveProduct={
                                                handleRemoveProduct
                                            }
                                        />
                                    ) : (
                                        ''
                                    )
                                )
                            ) : (
                                <h2 className="text-TextMidSmall text-txt-grey-color-faded font-bold mt-5 cursor-default">
                                    Nothing to show yet
                                </h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
