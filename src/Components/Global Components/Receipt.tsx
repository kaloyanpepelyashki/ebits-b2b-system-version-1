//Importing React hooks
import { useContext } from 'react'

//Importing Context components
import { ShoppingCartFunc } from '../Context Components/ShoppingCartFuncContext'

//Importing types and interfaces
import { BasketProductObjectType } from '../../Types/ShoppingCartTypes'

//Importing Components
import ProductDisplayReceipt from '../Small Components/ProductDisplayReceipt'

type ReceiptPropsType = {
    children: any
}

export default function Receipt(props: ReceiptPropsType) {
    //Object destructuring from the Shopping cart context
    const {
        cartProducts,
        funcs: { reduceProductAmount },
        total,
        isKit,
    } = useContext(ShoppingCartFunc)

    const handleReduceProductAmount = (product: BasketProductObjectType) => {
        reduceProductAmount(product)
    }

    return (
        <>
            <div className="separate-product-receipt-wrapper block px-4 py-6  pb-51 bg-white border-white border-slate-300 rounded-sm text-sm shadow-2xl max-w-screen-lg ">
                <h1 className="text-total text-TextMid text-primary-color font-bold cursor-default">
                    {isKit ? 'Kit' : 'Total'}
                </h1>

                <div className="receipt-top-section flex flex-col sm:flex-row justify-center items-center">
                    <p className="text-primary-color text-ProductTitleSmall mr-4 -mb-8 cursor-default">
                        Ex VAT
                    </p>

                    <p className="ReceiptPriceL text-TextBig text-primary-color cursor-default">
                        {total.toFixed(2)}
                    </p>

                    <p className="text-primary-color font-bold text-ProductTitleSmall ml-4 mt-6 cursor-default">
                        DKK.
                    </p>
                </div>

                <div className="line line-3 mt-1.5"></div>

                <div
                    className="product-receipt-products-display-section"
                    style={{ height: isKit ? '46%' : '90%' }}
                >
                    <h1 className="text-cardText text-primary-color mt-4 mr-40 mb-3 font-bold cursor-default">
                        Products :
                    </h1>

                    <div
                        className="scroll-section sm:max-h-80 md:max-h-85 lg:max-h-100 xl:max-h-104 overflow-y-auto"
                        style={{ height: isKit ? '90%' : '90%' }}
                    >
                        {cartProducts.filter(
                            (product) => product.qty > 0 && product.varQty > 0
                        ).length != 0 ? (
                            cartProducts.map((product) =>
                                product.qty && product.varQty !== 0 ? (
                                    <ProductDisplayReceipt
                                        key={product.productBaksetUnqKey}
                                        product={product}
                                        handleReduceProductAmount={
                                            handleReduceProductAmount
                                        }
                                    />
                                ) : (
                                    ''
                                )
                            )
                        ) : (
                            <h2 className="text-TextSmall text-txt-grey-color-faded font-bold mt-2 cursor-default">
                                Nothing to show
                            </h2>
                        )}
                    </div>

                    {isKit ? <div className="line line-3"></div> : ''}
                </div>

                {props.children}
            </div>
        </>
    )
}
