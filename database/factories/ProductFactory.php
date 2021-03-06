<?php

use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'name'             => $faker->sentence,
        'description'     => $faker->text(500),
        'price'           =>mt_rand( 200 , 2000 )
    ];
});