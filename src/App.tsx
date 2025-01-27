import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import RecipeList from './component/RecipeList'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  
   return(<>
    <Provider store={store}>
    <RecipeList/>
    </Provider>
   {/* <RouterProvider router={router} /> */}
   </>)
}

export default App
