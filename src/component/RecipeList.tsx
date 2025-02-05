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
            {isLogin && <AddRecipe />}
            <Box sx={{ width: '30%', padding: 2 }}>
                <Typography variant="h5">רשימת מתכונים</Typography>
                {recipesList.map(r => (
                    <Link key={r.id} to={`/recipes/${r.id}`}>
                        <Typography variant="body1">{r.title}</Typography>
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default RecipesList;
