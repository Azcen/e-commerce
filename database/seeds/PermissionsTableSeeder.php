<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\User;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         //Permission list
         Permission::create(['name' => 'products.index']);
         Permission::create(['name' => 'products.edit']);
         Permission::create(['name' => 'products.show']);
         Permission::create(['name' => 'products.create']);
         Permission::create(['name' => 'products.destroy']);
 
         //Admin
         $admin = Role::create(['name' => 'Admin']);
 
         $admin->givePermissionTo([
             'products.index',
             'products.edit',
             'products.show',
             'products.create',
             'products.destroy'
         ]);
         //$admin->givePermissionTo('products.index');
         //$admin->givePermissionTo(Permission::all());
        
         //Guest
         $guest = Role::create(['name' => 'Customer']);
 
         $guest->givePermissionTo([
             'products.index',
             'products.show'
         ]);
 
         //User Admin
         $custom= User::All();
         foreach( $custom as $item){
            $item->assignRole('Customer');
         }
         
         $user = User::find(1); //Italo Morales
         $user->removeRole('Customer');
         $user->assignRole('Admin');
    }
}
