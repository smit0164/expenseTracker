import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';
export const createGroup = createAsyncThunk(
    'group/createGroup',
    async ({groupName}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/createGroup', {name: groupName});
            return response.data;
        } catch (error) {
          
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchGroups = createAsyncThunk(
    'group/fetchGroups',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/fetchGroups');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteGroup = createAsyncThunk(
    'group/deleteGroup',
    async (id , { rejectWithValue }) => {
      try {
        console.log("inside the delete",id)
        const response = await axiosInstance.delete(`/deleteGroup/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                console.log("loafin inside the alice",state.loading);
                state.loading=true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.groups.push(action.payload.group);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = action.payload.groups;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                 state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(deleteGroup.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = state.groups.filter((group) => group.id !== action.payload.group.id);
            })
            .addCase(deleteGroup.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.error;
            })
    },

    });

export  default groupSlice.reducer;