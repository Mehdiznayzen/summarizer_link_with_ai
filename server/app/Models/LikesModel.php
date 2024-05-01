<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\chatsModel;
use App\Models\messagesModel;

class LikesModel extends Model
{
    use HasFactory;

    protected $table = 'likes';
    protected $fillable = ['id_user', 'id_chat', 'id_message'];

    public function chat(){
        return $this->belongsTo(chatsModel::class, 'id_chat');
    }

    public function  message() {
        return $this->belongsTo(messagesModel::class,'id_message');
    }
}
