<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\contactModel;

class contactController extends Controller
{
    public function store(Request $request) {
        $newContact = contactModel::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'message' => $request->input('message')
        ]);

        return response()->json([
            'status' => true,
            'contact' => $newContact
        ]);
    }
}
