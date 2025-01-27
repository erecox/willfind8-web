<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpoNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'body',
        'data',
        'user_id',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function data(): Attribute
    {
        return Attribute::make(
            set: fn(mixed $value) => json_encode($value),
            get: fn(mixed $value) => json_decode($value, true),
        );
    }

    public static function markAsRead($Ids)
    {
        if (is_array($Ids))
            return self::whereIn('id', $Ids)->update(['status' => 'read']);
        else     return self::where('id', $Ids)->update(['status' => 'read']);
    }

    public static function markAllAsReadFor(int $userId)
    {
        return self::where([
            'user_id' => $userId,
            'status' => 'delivered'
        ])->update(['status' => 'read']);
    }
}
