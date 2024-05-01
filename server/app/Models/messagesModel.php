<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\chatsModel;
use App\Models\LikesModel;

class messagesModel extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = ['user_message', 'ai_message', 'user_id', 'chat_id'];

    public function chat(){
        return $this->belongsTo(chatsModel::class, 'chat_id');
    }

    public function likes(){
        return $this->hasMany(likesModel::class,'id');
    }
}
