<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\customersModel;

class customersController extends Controller {

    public function index(Request $request) {
        return customersModel::where('email', $request->input('email'))->first();
    }

    public function store(Request $request){
        try {
            $request->validate([
                'email' => 'required'
            ]);

            $newCustomer = new customersModel();
            $newCustomer->email = $request->input('email');

            $newCustomer->save();
            return response()->json(['status' => true, 'message' => 'New customer is added .']);

        } catch (\Exception $error) {
            return response()->json(['status' => false, 'message' => $error->getMessage()]);
        }
    }
}
