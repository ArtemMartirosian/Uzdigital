import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios'; // Import axios
import request from "../../apis/config/axiosConfig";

interface State {
    value: number;
    loading: boolean,
    error: string | null;
    userData?: UserData;
    cardData?: CardData;
}

export interface PaymentMethod {
    id: string;
    scheduled_payments : any
}

const initialState: State = {
    value: 0,
    loading: false,
    error: null,
    userData: undefined,
    cardData: undefined,
};

export interface UserData {
    id: number;
    name: string;
    phone: string;
    language: string;
    telegram_chat_id: string;
    status: number;
    created_at: string;
    updated_at: string;
}

interface CardData {
    id: number;
    cardId: number;
    cardName: string;
    cardDetails: string;
    userId: number | undefined;
    payment_methods: PaymentMethod[];
}





export const getUserData = createAsyncThunk<UserData, void>(
    'user/getUserData',
    async () => {
        try {
            const response = await request.get<UserData>('users');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.message);
            } else {
                throw new Error('Failed to send user data');
            }
        }
    }
);

export const getCardData = createAsyncThunk<AxiosResponse<CardData>, number | null>(
    'user/getCardData',
    async (userId) => {
        try {
            const response = await request.get<CardData>(`/card/${userId}`);
            return response; // Return the full response object
        } catch (error) {
             throw new Error('Failed to fetch card data');
        }
    }
);


const userSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.loading = false
                state.userData = action.payload;
                if (action.payload.id) {
                    getCardData(action.payload.id);
                }
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to send user data';
            })
            .addCase(getCardData.pending, (state) => {
                state.loading = true;
            })
            // @ts-ignore
            .addCase(getCardData.fulfilled, (state, action: PayloadAction<CardData>) => {
                state.loading = false;
                state.cardData = action.payload;
            })
            .addCase(getCardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch card data';
            });
    },
});

export default userSlice.reducer;
