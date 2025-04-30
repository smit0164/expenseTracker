<?php

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Models\Expense;
use App\Models\User;
class ExpenseController extends Controller
{
    public function store(StoreExpenseRequest $request)
    {
        
        try {
            // Create a new expense
            $expense = auth()->user()->expenses()->create([
                'name' => $request->name,
                'amount' => $request->amount,
                'group_id' => $request->group_id,
                'date' => $request->date,
            ]);

            return response()->json([
                'message' => 'Expense created successfully',
                'expense' => $expense,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create expense',
                'errors' => ['server' => [$e->getMessage()]],
            ], 500);
        }
    }

    public function fetchExpenses()
    {
        try {
            // Fetch all expenses for the authenticated user
            $expenses = auth()->user()->expenses;

            return response()->json([
                'message' => 'Expenses fetched successfully',
                'expenses' => $expenses,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch expenses',
                'errors' => ['server' => [$e->getMessage()]],
            ], 500);
        }
    }
    public function delete($id)
    {
        try {
            $expense = auth()->user()->expenses()->where('id', $id)->first();
    
            if (!$expense) {
                return response()->json([
                    'error' => 'Expense not found or unauthorized'
                ], 404);
            }
    
            $expense->delete();
    
            return response()->json([
                'message' => 'Expense deleted successfully',
                'expense' => $expense,
            ], 200);
    
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Something went wrong',
                'details' =>$e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate the incoming data
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'amount' => 'required|numeric|min:0',
                'group_id' => 'required|exists:groups,id',
                'date' => 'required|date',
            ]);
    
            // Find the expense
            $expense = Expense::find($id);
    
            // Check if expense exists
            if (!$expense) {
                return response()->json([
                    'message' => 'Expense not found.'
                ], 404);
            }
    
            // Update the expense with validated data
            $expense->update($validatedData);
    
            // Return success response
            return response()->json([
                'message' => 'Expense updated successfully.',
                'expense' => $expense
            ]);
    
        } catch (\Exception $e) {
            // Return error response
            return response()->json([
                'message' => 'Something went wrong while updating the expense.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
}
