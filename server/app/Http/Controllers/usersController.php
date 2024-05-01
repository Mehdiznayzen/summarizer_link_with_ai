<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\users;

class usersController extends Controller
{
    public function index(Request $request) {
        $user = users::where('id', $request->input('id'))->get();
        return $user;
    }

    public function store(Request $request){
        try {
            $username = $request->input('username');
            $email = $request->input('email');

            // Vérifier si le nom d'utilisateur ou l'Email existe déjà
            $findUsername = users::where('username', $username)->first();
            $findEmail = users::where('email', $email)->first();

            if ($findUsername) {
                return response()->json([
                    'status' => false,
                    'message' => 'Username already exists !!'
                ]);
            }else if($findEmail){
                return response()->json([
                    'status' => false,
                    'message' => 'Email already exists !!'
                ]);
            }

            $newUser = [
                'id' => $request->input('id'),
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'bio' => $request->input('bio'),
                'image' => $request->input('image')
            ];

            users::create($newUser);

            return response()->json([
                'status' => true,
                'message'=> $newUser
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'error' => $error,
                'status' => false
            ]);
        }
    }
}
