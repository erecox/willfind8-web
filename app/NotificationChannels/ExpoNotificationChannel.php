<?php

namespace App\NotificationChannels;

use App\Models\ExpoNotification;
use ExpoSDK\Expo;
use ExpoSDK\ExpoResponse;

class ExpoNotificationChannel
{

    protected $expo;

    public function __construct(Expo $expo)
    {
        $this->expo = $expo;
    }
    /**
     * Send the given notification.
     *
     * @param mixed $notifiable
     * @param mixed $notification
     * @return void
     */
    public function send($notifiable, $notification)
    {
        // Get the message data from the notification
        $message = $notification->toExpo($notifiable);

        // Get the Expo push tokens from the notifiable entity
        $tokens = $notifiable->routeNotificationFor('expo');

        // Checks if there are tokens
        if (empty($tokens)) return;

        $notification = (new ExpoNotification($message->toArray()));
        $notification->user_id = $notifiable->id;
        $notification->save();

        // Send the notification
        $response = $this->expo->send($message)->to($tokens)->push();

        // Handle response
        $this->handleResponse($response, $notification);
    }

    protected function handleResponse(ExpoResponse $response, ExpoNotification $notification)
    {
        $notification->status = $response->ok() ? 'delivered' : 'failed';
        $notification->save();
    }
}
