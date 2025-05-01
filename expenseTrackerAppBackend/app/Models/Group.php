<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Expense;

class Group extends Model
{
    protected $fillable = [
        'name',
        'user_id',
    ];
    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}
