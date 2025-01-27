<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expo_notifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id'); // Link to the user
            $table->string('title'); // Notification title
            $table->string('subtitle'); // Notification subtitle
            $table->text('body'); // Notification body
            $table->json('data')->nullable(); // Additional data (e.g., user profile)
            $table->enum('status', ['pending', 'delivered', 'read', 'failed'])->default('pending'); // Status: pending, delivered, read, failed
            $table->timestamps();

             // Foreign key constraint
             $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expo_notifications');
    }
};
