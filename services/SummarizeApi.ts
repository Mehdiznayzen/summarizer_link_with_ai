import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const SummarizerApi = createApi({
    reducerPath : 'summarizerApi',
    baseQuery : fetchBaseQuery({
        baseUrl : "https://article-extractor-and-summarizer.p.rapidapi.com/",
        prepareHeaders : (headers : any) => {
            headers.set('X-RapidAPI-Key', 'b4530ce3b7msh4362ecd9634cc77p174a32jsnec5018c1f186'),
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')

            return headers
        }
    }),
    endpoints : (builder : any) => ({
        getSummary : builder.query({
            query : (params : any) => `/summarize?url=${encodeURIComponent(params.url)}&length=5&lang=${encodeURIComponent(params.language)}`
        })
    })
})

export const {
    useLazyGetSummaryQuery
} = SummarizerApi