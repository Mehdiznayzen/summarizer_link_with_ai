<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\messagesModel;

class messagesController extends Controller
{
    public function index(Request $request){
        return messagesModel::where('chat_id', $request->input('chat_id'))->get();
    }

    public function show($id) {
        $message = messagesModel::where('id', $id)->first();

        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        return response()->json($message);
    }

    public function store(Request $request){
        $newMessage = [
            'user_message' => $request->input('user_message'),
            'ai_message' => $request->input('ai_message'),
            'user_id' => $request->input('user_id'),
            'chat_id' => $request->input('chat_id')
        ];

        messagesModel::create($newMessage);

        return response()->json([
            'status' => true,
            'chat' => $newMessage
        ]);
    }
}
