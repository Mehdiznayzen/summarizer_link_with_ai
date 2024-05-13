<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class contactController extends Controller
{
    public function store(Request $request) {
        $name = $request->input('name');
        $email = $request->input('email');
        $message = $request->input('message');

        $newContact = DB::statement('CALL create_contact(?, ?, ?)', [$name, $email, $message]);

        return response()->json([
            'status' => true,
            'contact' => $newContact
        ]);
    }
}
