<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Teacher;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Ahmed khemiri',
            'email' => 'ahmed@test.com',
            'password' => Hash::make('123456789')
        ]);

        Admin::factory()->create([
            'firstname' => 'Admin',
            'lastname' => 'Admin',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(), 10),
            'email' => 'admin@admin.admin',

            'password' => Hash::make('123456789')
        ]);

        Teacher::factory()->create([
            'firstname' => 'Teacher',
            'lastname' => 'Teacher',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(), 10),
            'email' => 'teacher@teacher.teacher',
            'password' => Hash::make('123456789')
        ]);
    }
}
