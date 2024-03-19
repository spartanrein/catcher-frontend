import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scoreApi = createApi({
    reducerPath: 'scoresApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API}),
    tagTypes:['Scores'],
    endpoints: (builder) => ({
        getScores: builder.query({
            query: ({count}) => `/?count=${count}`,
            providesTags:['Scores'],
        }),
        postAddScore: builder.mutation({
            query: ({playerName, score}) => ({
                url: '/',
                method: 'POST',
                body: {
                    playerName:playerName,
                    score: score
                }
            }),
            invalidatesTags: ['Scores']
        }),
    })
})

export const { useGetScoresQuery, usePostAddScoreMutation } = scoreApi