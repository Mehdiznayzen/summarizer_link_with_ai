<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\messagesModel;
use App\Models\LikesModel;

class chatsModel extends Model
{
    use HasFactory;
    protected $table = 'chats';
    protected $fillable = ['chatName', 'id_user'];

    public function messages() {
        return $this->hasMany(messagesModel::class, 'id');
    }

    public function likes(){
        return $this->hasMany(LikesModel::class,'id');
    }
}
