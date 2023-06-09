//Importing React Hooks
import { useEffect, useState } from 'react'

//Importing React-router elements and components
import { Route, Routes, Navigate } from 'react-router'

//Importing Context Components
import { ShoppingCartProvider } from './Components/Context Components/ShoppingCartFuncContext'

//Importing types and interfaces
import { ProductListModel } from './Types/ShoppingCartTypes'

//Importing MUI elements, dependencies and components
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './App.css'
import LandingPage from './Pages/LandingPage'
import ProductSelectionPage from './Pages/ProductSelectionPage'
import HeaderBar from './Components/Global Components/HeaderBar'
import { ContactInfoContProvider } from './Components/Context Components/ContactsInformationContext'
import ContactInfoPage from './Pages/ContactsPage'
import OutroPage from './Pages/OutroPage'

function App() {
    //*Fetching data from the server
    //////
    ////
    //

    const [productsList, setProductsList] = useState<ProductListModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://65.109.137.46:5000/api')
                .then((response) => response.json())
                .then((data) => {
                    setProductsList(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchData()
    }, [])

    console.log(productsList)
    //
    ////
    //////
    //*

    return (
        <div className="App">
            <HeaderBar />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ShoppingCartProvider>
                    <ContactInfoContProvider>
                        <Routes>
                            <Route
                                path="/Ebits-B2B-Portal/"
                                element={<LandingPage />}
                            />
                            <Route
                                path="/Ebits-B2B-Portal/select-products"
                                element={
                                    <ProductSelectionPage
                                        productsList={productsList}
                                    />
                                }
                            />
                            <Route
                                path="/Ebits-B2B-Portal/contact-info"
                                element={<ContactInfoPage />}
                            />
                            <Route
                                path="/Ebits-B2B-Portal/outro"
                                element={<OutroPage />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/Ebits-B2B-Portal/" />}
                            />
                        </Routes>
                    </ContactInfoContProvider>
                </ShoppingCartProvider>
            </LocalizationProvider>
        </div>
    )
}

export default App
