import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Recipe } from "../types/recipeType";
import Swal from "sweetalert2";

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
                    state.list = [ ...action.payload]
                })
            .addCase(fetchData.rejected,
                () => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Couldn't get the recipes",
                      });
                }
            )
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    state.list = [...state.list, {...action.payload}]
                    Swal.fire({
                        title: "The recipe was successfully added",
                        text: "The recipe "+action.payload.title+" was successfully added",
                        icon: "success"
                      });
                })
            .addCase(addRecipe.rejected,
                () => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "The recipe wasnt successfully added",
                      });
                })
    }
});
export default recipesSlice;