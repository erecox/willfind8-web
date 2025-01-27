<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\NotificationChannels\ExpoNotificationChannel;
use ExpoSDK\Expo;
use Mockery;
use Illuminate\Notifications\Notification;

class ExpoNotificationChannelTest extends TestCase
{
    public function test_send_notification()
    {
        // Mock the Expo SDK
        $expoMock = Mockery::mock(Expo::class);
        $expoMock->shouldReceive('notify')
            ->once()
            ->with(Mockery::type('array'), Mockery::type('array'));

        // Create an instance of the ExpoNotificationChannel with the mocked Expo SDK
        $channel = new ExpoNotificationChannel($expoMock);

        // Mock the notifiable entity
        $notifiable = Mockery::mock();
        $notifiable->shouldReceive('routeNotificationFor')
            ->with('expo')
            ->andReturn(['ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]']);

        // Mock the notification
        $notification = Mockery::mock(Notification::class);
        $notification->shouldReceive('toExpo')
            ->with($notifiable)
            ->andReturn(['title' => 'Test Notification', 'body' => 'This is a test notification.']);

        // Call the send method
        $channel->send($notifiable, $notification);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}