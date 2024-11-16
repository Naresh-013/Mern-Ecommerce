import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Sell from '../pages/Sell'
import About from '../pages/About'
import Rent from '../pages/Rent'
import Contact from '../pages/Contact'
import ProductPage from '../components/ProductPage'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import CategoryPage from '../components/CategoryPage'
import UserDetails from '../pages/userDetail'





const router = createBrowserRouter([
    
    
    {
        path :"/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>,
                
                
            }
        ],   
    },
    {
        path : 'About',
        element : <About/>
    },
    {
        path : 'Contact',
        element : <Contact/>
    },
    {
        
        path : 'Rent',
        element : <Rent/>
        
    },
    {
        
        path : 'Sell',
        element : <Sell/>
        
    },
    {
        path: "/product/:productId",
        element: <ProductPage />
    },
    {
        path: "login",
        element : <Login/>
    },
    {
        path:"forgot-password",
        element : <ForgotPassowrd/>
    },
    {
        path: "sign-up",
        element : <SignUp/>
    },
    {
        path: "/category/:category",
        element: <CategoryPage />
    },
    {
        path : "/rentProduct",
        element :<rentProduct/>
    },
    {
        path : "/user-details",
        element : <UserDetails/>
    },
    
])



export default router