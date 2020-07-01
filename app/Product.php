<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    use Sluggable;
 
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name',
                
            ]
        ];
    }

    //
    protected $fillable = [
        'name', 
        
        'description',
        'price',
        'status'
    ];

    
}
