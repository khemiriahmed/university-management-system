<?php

namespace App\Models;

use App\Http\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
     use HasFactory,SoftDeletes,HasApiTokens,Notifiable;


     protected $hidden = [
        'password',
        'email_verified_at',
        'remember_token',
    ];

       protected $appends = ['role'];
       public function getRoleAttribute(){
        return 'admin';
    }

}
