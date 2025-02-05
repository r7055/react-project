import { TextField } from '@mui/material';
import { FC, useState, KeyboardEvent } from 'react';

const IngredientInput: FC<{ onIngredientsChange: (ingredients: string[]) => void }> = ({ onIngredientsChange }) => {
    const [ingredients, setIngredients] = useState<string[]>(['']);

    const handleInputChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
        onIngredientsChange(newIngredients);
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (ingredients[index].trim() !== '') {
                setIngredients([...ingredients, ''])
                onIngredientsChange([...ingredients, ''])
            }
        }
    };

    const handleRemoveIngredient = (index: number) => {

            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
            onIngredientsChange(newIngredients);
        
    };

    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        name="ingredient"
                        label="Ingredient"
                        variant="outlined"
                        margin="normal"
                        value={ingredient}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                        placeholder="ingredient"
                    />
                    {index > 0 && <button onClick={() => handleRemoveIngredient(index)}>❌</button>}
                </div>
            ))}
        </div>
    );
};

export default IngredientInput;