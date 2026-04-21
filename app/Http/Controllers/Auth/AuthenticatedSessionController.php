<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        // Essayer admin d'abord
        if (Auth::guard('admin')->attempt($credentials)) {
            $user = Auth::guard('admin')->user();
            $token = $user->createToken('auth_token', [$user->getRoleAttribute()])->plainTextToken;
            return response()->json([
                'token' => $token,
                'role' => 'admin'
            ]);
        }

        // Essayer user (student)
        if (Auth::guard('web')->attempt($credentials)) {
            $user = Auth::guard('web')->user();
            $token = $user->createToken('auth_token', [$user->getRoleAttribute()])->plainTextToken;
            return response()->json([
                'token' => $token,
                'role' => 'student'
            ]);
        }


        // Essayer user (student)
        if (Auth::guard('teacher')->attempt($credentials)) {
            $user = Auth::guard('teacher')->user();
            $token = $user->createToken('auth_token', [$user->getRoleAttribute()])->plainTextToken;
            return response()->json([
                'token' => $token,
                'role' => 'student'
            ]);
        }

        // Essayer user (parent)
        if (Auth::guard('parent')->attempt($credentials)) {
            $user = Auth::guard('parent')->user();
            $token = $user->createToken('auth_token', [$user->getRoleAttribute()])->plainTextToken;
            return response()->json([
                'token' => $token,
                'role' => 'parent'
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);



    }

    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();


        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}