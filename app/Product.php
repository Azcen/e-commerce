<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;
    //
    protected $fillable = [
        'name', 
        'slug',
        'description',
        'price',
        'status'
    ];

    
}
