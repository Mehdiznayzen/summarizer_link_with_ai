<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\chatsModel;

class chatsController extends Controller
{

    public function index(Request $request) {
        $userId = $request->input('id_user');

        $chats = chatsModel::where('id_user', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return $chats;
    }

    public function show(chatsModel $chat)
    {
        return response()->json([
            'chat' => $chat
        ]);
    }

    public function store(Request $request){
        $newChat = chatsModel::create([
            'chatName' => $request->input('chatName'),
            'id_user' => $request->input('id_user')
        ]);

        return response()->json([
            'status' => true,
            'chat' => $newChat
        ]);
    }

    public function update(Request $request, chatsModel $chat){
        try {
            $request->validate([
                'chatName' => 'required|string',
            ]);

            $chat->update([
                'chatName' => $request->input('chatName'),
            ]);

            return response()->json([
                'message' => 'Item updated successfully'
            ]);

        } catch (\Exception $error) {
            return response()->json([
                'error' => $error->getMessage()
            ], 500);
        }
    }

    public function destroy(chatsModel $chat){
        try{
            $chat->delete();
            return response()->json([
                'status'=>true,
                'message' => 'The chat is deleted.'
            ]);
        }catch(\Exception $error){
            return response()->json([
                'status'=>false
            ]);
        }
    }
}
