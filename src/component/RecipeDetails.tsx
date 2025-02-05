import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { StoreType } from '../store/store';
import { Container, Typography, List, ListItem, Card, CardContent } from '@mui/material';

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const recipe = recipesList.find(r => r?.id && r.id.toString() === id);

    if (!recipe) {
        return <Typography variant="h4"> The recipe is not found</Typography>;
    }

    return (
        <Container sx={{ marginTop: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{recipe.title}</Typography>
                    <Typography variant="body1" >{recipe.description}</Typography>
                    <Typography variant="h6">מרכיבים:</Typography>
                    <List>
                        {recipe.ingredients?.map((ingredient, index) => (
                            <ListItem key={index}>{ingredient}</ListItem>
                        ))}
                    </List>
                    <Typography variant="h6">הוראות הכנה:</Typography>
                    <Typography variant="body1">{recipe.instructions}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RecipeDetails;

