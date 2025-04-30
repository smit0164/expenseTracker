<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Barryvdh\DomPDF\Facade as PDF; // Ensure the package is installed
use Illuminate\Http\Request;

class ExpensePdfController extends Controller
{
    public function downloadExpensePdf()
    {
        // Get expenses data (adjust according to your data model)
        $expenses = Expense::all(); // Fetch all expenses, or filter as needed

        // Generate PDF
        $pdf = PDF::loadView('pdf.expenses', compact('expenses')); // Assuming you have a view for PDF

        // Return the PDF as a download
        return $pdf->download('expenses.pdf');
    }
}
