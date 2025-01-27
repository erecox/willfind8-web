<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpoDevice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'token',
        'device_name',
    ];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}