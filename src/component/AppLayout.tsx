import Header from "./Header"
import {Outlet} from "react-router"
const applayout=()=>{
    return(<>
   
    <Header/>
    <Outlet />
    </>)
}
export default applayout 