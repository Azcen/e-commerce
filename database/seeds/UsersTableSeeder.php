<?php

use Illuminate\Database\Seeder;
use App\User;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\User::create([
            'name'      => 'Alex Ochoa',
            'email'     => 'admin@example.com',
            'password'     => bcrypt('password'),

        ]);

        factory(App\User::class, 7)->create();
    }
}
