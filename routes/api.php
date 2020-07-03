<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get ('/products/all', 'ProductController@getAll');
Route::apiResource('products', 'ProductController')->only([
    'index', 'show'
]);

Route::get('userstable', 'UserController@index');
Route::post('uploadimg', 'ImgProductController@store');
  
/*Route::group(['middleware' => 'auth.api'], function() {
    Route::get('logout', 'AuthController@logout');

    
    
});*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('register', 'AuthController@adminregis');
    

    
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
        Route::patch ('update', 'AuthController@update');
        Route::patch ('products/update', 'ProductController@update');
        Route::post ('products/create', 'ProductController@store');
        Route::delete ('delete/{id}', 'AuthController@destroy');
        Route::delete ('products/delete/{id}', 'ProductController@destroy');

        
        

    });
});
