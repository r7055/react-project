import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./recipesSlice";

const store = configureStore({
    reducer: combineSlices(
        recipesSlice
    ),
});

export type StoreType = ReturnType<typeof store.getState>

export default store