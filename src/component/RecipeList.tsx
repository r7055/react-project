import { useDispatch, useSelector } from 'react-redux'
import { addRecipe, fetchData } from '../store/recipesSlice';
import { StoreType } from '../store/store';
import { useEffect } from 'react';

const RecipesList = () => {
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    return (
        <>
            <div>
                {recipesList.map(r => <div key={r.id} /*onclick{}*/>{r.title}</div>)}
                <button onClick={() => dispatch(addRecipe({title:"ruhami",desc:"sova"}))}>add</button>
            </div>
        </>
    );
};
export default RecipesList; 
