<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        //$user =  User::find(2)->where('role','Customer')->get();
        $query = DB::table('users')
            ->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->select('users.id','users.name','users.email', 'roles.name as role')
            
            ->get();
            
           

            //dd($userInfo);
        
        //dd(json_encode($query));
        return $query;
        
    }
}
