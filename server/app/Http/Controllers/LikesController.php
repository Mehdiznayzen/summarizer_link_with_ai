<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LikesModel;

class LikesController extends Controller
{
    public function store(Request $request){
        try {
            $newLike = [
                'id_user' => $request->input('id_user'),
                'id_chat' => $request->input('id_chat'),
                'id_message' => $request->input('id_message'),
            ];

            LikesModel::create($newLike);

            return response()->json([
                'status' => true,
                'message'=> $newLike
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'error' => $error,
                'status' => false
            ]);
        }
    }
}
