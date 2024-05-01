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
        Schema::create('messages', function(Blueprint $table) {
            $table->id();
            $table->string('user_message');
            $table->text('ai_message');
            $table->string('user_id');
            $table->unsignedBigInteger('chat_id');
            $table->foreign( 'chat_id' )->references('id')->on('chats')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
