<?php

namespace App\Providers;

use App\NotificationChannels\ExpoNotificationChannel;
use ExpoSDK\Expo;
use Illuminate\Notifications\ChannelManager;
use Illuminate\Support\ServiceProvider;

class ExpoNotificationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        $this->app->singleton(Expo::class, function ($app) {
            return new Expo();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
        $this->app->make(ChannelManager::class)->extend('expo', function ($app) {
            return new ExpoNotificationChannel($app->make(Expo::class));
        });
    }
}
