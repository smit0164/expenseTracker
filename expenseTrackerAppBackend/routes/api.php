<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Group\GroupController;
use App\Http\Controllers\Expense\ExpenseController;
use App\Http\Controllers\ExpensePdfController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/fetchUser', [AuthController::class, 'fetchUser']);
    Route::post('/createGroup', [GroupController::class, 'store']);
    Route::get('/fetchGroups', [GroupController::class, 'fetchGroups']);
    Route::post('/createExpense', [ExpenseController::class, 'store']);
    Route::get('/fetchExpenses', [ExpenseController::class, 'fetchExpenses']);
    Route::delete('/deleteGroup/{id}',[GroupController::class, 'delete']);
    Route::delete('/deleteExpense/{id}',[ExpenseController::class, 'delete']);
    Route::put('/updateExpense/{id}', [ExpenseController::class, 'update']);
   
});
Route::get('/download-expense-pdf', [ExpensePdfController::class, 'downloadExpensePdf'])->name('download.expense.pdf');