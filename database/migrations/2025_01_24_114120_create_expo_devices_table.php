<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('expo_devices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Link to the user
            $table->string('token')->unique(); // Expo push token for the device
            $table->string('device_name')->nullable(); // e.g.
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('expo_devices');
    }
};