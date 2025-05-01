<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromArray;

class GroupWiseExpenseExport implements FromArray
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function array(): array
    {
        $data = [];

        $groups = $this->user->groups()->with('expenses')->get();

        foreach ($groups as $group) {
            $data[] = ["Group: {$group->name}"];
            $data[] = ['#', 'Expense Name', 'Amount', 'Date'];

            foreach ($group->expenses as $index => $expense) {
                $data[] = [
                    $index + 1,
                    $expense->name,
                    '₹' . number_format($expense->amount, 2),
                    $expense->created_at->format('d M Y'),
                ];
            }

            $data[] = []; 
        }

        return $data;
    }
}
