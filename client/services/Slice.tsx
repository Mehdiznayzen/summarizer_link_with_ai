import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllmessages = createAsyncThunk('summarizer/getAllmessages', async (chatId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/messages?chat_id=${chatId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});


export const getAllchats = createAsyncThunk('summarizer/getAllChats', async (userId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chats?id_user=${userId}`)
        return response.data;
    } catch (error) {
        throw error
    }
})

export const Slice = createSlice({
    name: 'summarizer',
    initialState: {
        chats: [],
        messages: [],
        loadingMessages: false,
        loadingChats: true,
    },
    reducers: {
        addMessages(state, action) {
            state.messages.push(action.payload);
        },

        addChat(state, action) { 
            if (Array.isArray(state.chats)) {
                state.chats.push(action.payload);
            } else {
                console.error('State.chats is not an array:', state.chats);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllmessages.pending, (state) => {
                state.loadingMessages = true;
            })
            .addCase(getAllmessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.loadingMessages = false;
            })
            .addCase(getAllmessages.rejected, (state, action) => {
                state.loadingMessages = false;
                console.error('Erreur lors de la récupération des messages:', action.error);
            })
            .addCase(getAllchats.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.loadingChats = false;
            });
    },
});

export const actions = Slice.actions;