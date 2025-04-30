import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import groupReducer from '../features/groupSlice'
import expenseReducer from '../features/expenseSlice'
export  const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    expense: expenseReducer,
  },
})
