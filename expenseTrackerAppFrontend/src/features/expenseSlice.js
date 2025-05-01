import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';
export const createExpense = createAsyncThunk(
    'expense/createExpense',
    async ({name, amount, category,date}, { rejectWithValue }) => {
        
        try {
            const response = await axiosInstance.post('/createExpense', {name, amount, group_id:category,date});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

);
export const updateExpense = createAsyncThunk(
    'expense/updateExpense',
    async ({ id, name, amount, category, date }, { rejectWithValue }) => {
        try {
            console.log("id",id);
            const response = await axiosInstance.put(`/updateExpense/${id}`, {
                name,
                amount,
                group_id: category,
                date,
            });
            return response.data;
        } catch (error) {
            console.log("reject update",error);
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const fetchExpenses = createAsyncThunk(
    'expense/fetchExpenses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/fetchExpenses');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);
export const deleteExpense= createAsyncThunk(
    'expense/deleteExpense',
    async (id , { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(`/deleteExpense/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
export const downloadPdf=createAsyncThunk(
        'expense/downloadPdf',
    async(_,{rejectWithValue})=>{
        try{
             const response=await axiosInstance.get('/download-expense-pdf',{
                responseType:'blob',
             });
             const blob=new Blob([response.data],{type:'application/pdf'});
            
             const url = window.URL.createObjectURL(blob);
             console.log("url",url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_report.pdf');
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            return true; // indicate success
        }catch(err){
            return rejectWithValue(err.response?.data || 'Something went wrong');
        }
    }       
)
export const downloadGroupWiseExpenses = createAsyncThunk(
    'expense/downloadGroupWiseExpenses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/export/group-wise-expenses', {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'group_wise_expenses.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            return true; // indicate success
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong');
        }
    }
);
export const expenseSlice = createSlice({
    name: 'group',
    initialState: {
        expenses: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createExpense.pending, (state) => {
                state.loading=true;
                state.error = null;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses.push(action.payload.expense);
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload.expenses;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(deleteExpense.pending,(state)=>{
                 state.loading=true;
                 state.error=null;
            })
            .addCase(deleteExpense.fulfilled,(state,action)=>{
                state.loading=false;
                state.expenses=state.expenses.filter((expense)=>expense.id!=action.payload.expense.id)
            })
            .addCase(deleteExpense.rejected,(state)=>{
                state.loading=false;
                state.error=action.payload.error;
            })
        builder
            .addCase(updateExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.loading = false;
                const updatedExpense = action.payload.expense;
                state.expenses = state.expenses.map((expense) =>
                    expense.id === updatedExpense.id ? updatedExpense : expense
                );
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(downloadPdf.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(downloadPdf.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(downloadPdf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(downloadGroupWiseExpenses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(downloadGroupWiseExpenses.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(downloadGroupWiseExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

    });

export  default expenseSlice.reducer;