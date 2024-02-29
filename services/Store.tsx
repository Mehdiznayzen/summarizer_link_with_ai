'use client';

import { configureStore } from '@reduxjs/toolkit'
import { SummarizerApi } from './SummarizeApi'

export const Store = configureStore({
    reducer : {
        [SummarizerApi.reducerPath] : SummarizerApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(SummarizerApi.middleware)
})