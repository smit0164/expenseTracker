<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\AuthStoreRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function register(AuthStoreRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            
            $token = $user->createToken('auth_token')->plainTextToken;
            
            return response()->json([
                'type' => 'success',
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $token,
            ], 201);
    
        } catch (\Exception $e) {
            return response()->json([
                'type' => 'error',
                'message' => 'Something went wrong while registering',
                'error' => $e->getMessage() 
            ], 500);
        }
    }
    
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            
            if ($validator->fails()) {
                return response()->json([
                    'type' => 'error',
                    'message' => 'Validation errors',
                    'errors' => $validator->errors(),
                ], 422); 
            }
    
            $user = User::where('email', $request->email)->first();
            
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'type' => 'error',
                    'message' => 'Invalid credentials',
                    'errors' => ['invalidcredentials' => 'The provided credentials are incorrect.'],
                ], 401);
            }
            
            $token = $user->createToken('auth_token')->plainTextToken;
            
            return response()->json([
                'type' => 'success',
                'message' => 'User logged in successfully',
                'user' => $user,
                'token' => $token,
            ], 200);
    
        } catch (\Exception $e) {

            return response()->json([
                'type' => 'error',
                'message' => 'Something went wrong while logging in',

            ], 500);
        }
    }

    public function fetchUser()
    {
       return response()->json([
            'type' => 'success',
            'message' => 'User fetched successfully',
            'user' => auth()->user(),
        ], 200);
    }
    

}
