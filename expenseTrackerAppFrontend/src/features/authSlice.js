import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation, 
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchUser = createAsyncThunk(  
            
        'auth/fetchUser',
        async (_, { rejectWithValue }) => {
            try {
                const response = await axiosInstance.get('/fetchUser');
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        }
);
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/login', {
                email: formData.email,
                password: formData.password,
            });
            return response.data;


        } catch (error) {

            return rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        token: localStorage.getItem('token') || null, // Correct: no parentheses after localStorage
        error: null,
    },
    
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null; // Reset error on logout
            state.loading = false; // Reset loading on logout
            localStorage.removeItem('token'); // Remove token from local storage on logout
        },
    },  // This is the correct place for sync reducers like 'setUser', 'setError', etc.

    extraReducers: (builder) => {
        // This is where you would handle async actions, like 'pending', 'fulfilled', 'rejected' for API calls
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null; // Reset error on success
                localStorage.setItem('token', action.payload.token); // Store token in local storage
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null; // Reset user on failure
            });
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null; // Reset user on failure
                state.error = action.payload; // Set error on failure
            });
        builder
                .addCase(loginUser.pending, (state) => {
                    state.loading = true; 
                    state.error = null; 
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.error = null; // Reset error on success
                    localStorage.setItem('token', action.payload.token); // Store token in local storage
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.user = null; 
                    state.error = action.payload; // Set error on failure
                });
    }
});
export const { logout } = authSlice.actions; // Export the logout action
export default authSlice.reducer;
