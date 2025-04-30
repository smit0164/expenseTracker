<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory;

    // Mass-assignable fields
    protected $fillable = [
        'name',
        'amount',
        'group_id',
        'date',
        'user_id',
    ];

    // Each expense belongs to a group
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    // Each expense belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
