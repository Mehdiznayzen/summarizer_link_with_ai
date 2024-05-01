'use client';

import { configureStore } from '@reduxjs/toolkit'
import { SummarizerApi } from './SummarizeApi'
import { Slice } from './Slice';

export const Store = configureStore({
    reducer : {
        [SummarizerApi.reducerPath] : SummarizerApi.reducer,
        summarizer : Slice.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(SummarizerApi.middleware)
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;