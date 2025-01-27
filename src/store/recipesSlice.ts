import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Recipe = {
    id: number,
    title: string,
    desc: string

}
const url = 'http://localhost:3000/api/recipes'

export const fetchData = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.get(url)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

// export const addRecipe = createAsyncThunk('recipes/add',
//     async (recipe:Recipe, thunkAPI) => {
//         try {
//             console.log('in async thunk');
//             const response = await axios.get(url)
//             return response.data
//         }
//         catch (e:any) {
//             return thunkAPI.rejectWithValue(e.message)
//         }
//     }
// )
export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            console.log('add in async thunk');
            const response = await axios.post(url, {
                title: recipe.title,
                description: recipe.desc
            }
            )
            console.log(response.data);

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
                    console.log('fulfilled');
                    state.list = [...state.list, ...action.payload]
                })
            .addCase(fetchData.rejected,
                (state) => {
                    console.log('failed');
                }
            )
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    console.log("add recipe");

                    state.list = [...state.list, {...action.payload}]

                })
            .addCase(addRecipe.rejected,
                () => {
                    console.log("The add was faild");
                })
    }
});
export const { add } = recipesSlice.actions;
export default recipesSlice;