<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class customersModel extends Model
{
    use HasFactory;

    protected $table = 'customers';
    protected $fillable = ['email'];
}
