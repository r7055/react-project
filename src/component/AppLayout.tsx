import Header from "./Header"
import {Outlet} from "react-router"
import RecipeList from "./RecipeList"
const applayout=()=>{
    return(<>
   
    <Header/>
    <Outlet />
    </>)
}
export default applayout 