import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Recipe } from "../types/recipeType";

const url = 'http://localhost:3000/api/recipes'

export const fetchData = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(url)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            const response = await axios.post(url, 
            {
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions
            },{
                headers: {
                    "user-id": "" + recipe.authorId
                }
            }
            )
            return response.data.recipe
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { list: [] as Recipe[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled,
                (state, action) => {
                    alert('fulfilled')
                    state.list = [ ...action.payload]
                })
            .addCase(fetchData.rejected,
                () => {
                    alert('failed')
                }
            )
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    alert('add recipe')
                    console.log("add recipe");

                    state.list = [...state.list, {...action.payload}]

                })
            .addCase(addRecipe.rejected,
                () => {
                    alert('The add was faild')
                    console.log("The add was faild");
                })
    }
});
export default recipesSlice;