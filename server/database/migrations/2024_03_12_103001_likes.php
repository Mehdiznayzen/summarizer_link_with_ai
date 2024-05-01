<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('likes', function (Blueprint $table){
            $table->id();
            $table->string('id_user');
            $table->unsignedBigInteger('id_chat');
            $table->unsignedBigInteger('id_message');
            $table->foreign('id_chat')->references('id')->on('chats')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_message')->references('id')->on('messages')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
