// import { useDispatch, useSelector } from 'react-redux'
// import {  fetchData } from '../store/recipesSlice';
// import { AppDispatch, StoreType } from '../store/store';
// import { useEffect } from 'react';
// import AddRecipe from './AddRecipe';

// const RecipesList = () => {
//     const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
//     const dispatch = useDispatch<AppDispatch>();
//     useEffect(() => {
//         dispatch(fetchData())
//     }, [])
//     return (
//         <>
//             <div>
//                 {recipesList.map(r => <div key={r.id} /*onclick{}*/>{r.title}</div>)}
//                 <AddRecipe></AddRecipe>
//             </div>
//         </>
//     );
// };
// export default RecipesList; 




// import { fetchData } from '../store/recipesSlice';
// import { AppDispatch, StoreType } from '../store/store';
// import { useEffect } from 'react';
// import AddRecipe from './AddRecipe';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Outlet } from 'react-router';

// const RecipesList = () => {
//     const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
//     const dispatch = useDispatch<AppDispatch>();

//     useEffect(() => {
//         dispatch(fetchData());
//     }, [dispatch]);

//     return (
//         <>
//             <div>
//                 {recipesList.map(r => (
//                     <Link key={r.id} to={`/recipes/${r.id}`}>
//                         <div>{r.title}</div>
//                     </Link>
//                 ))}
//                 <AddRecipe />
//                 <Outlet />
//             </div>
//         </>
//     );
// };

// export default RecipesList;


import { fetchData } from '../store/recipesSlice';
import { RecipeDispatch, StoreType } from '../store/store';
import { useContext, useEffect } from 'react';
import AddRecipe from './AddRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router';
import { IsLogin } from '../App';

const RecipesList = () => {
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch<RecipeDispatch>();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const [isLogin,] = useContext(IsLogin)
    return (

        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '70%', padding: 2 }}>
                <Outlet />
            </Box>
            <Box sx={{ width: '30%', padding: 2 }}>
                <Typography variant="h5">רשימת מתכונים</Typography>
                {recipesList.map(r => (
                    <Link key={r.id} to={`/recipes/${r.id}`}>
                        <Typography variant="body1">{r.title}</Typography>
                    </Link>
                ))}
                {isLogin && <AddRecipe />}
            </Box>
        </Box>
    );
};

export default RecipesList;
