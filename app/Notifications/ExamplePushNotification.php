<?php

namespace App\Notifications;

use App\Models\Post;
use ExpoSDK\ExpoMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ExamplePushNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function via($notifiable)
    {
        return ['expo'];
    }

    public function toExpo($notifiable)
    {
        $badge = $notifiable->unreadNotifications->count();

        return (new ExpoMessage())
            ->setTitle("Hi $notifiable->name, new post approved!")
            ->setBody('Notification Body')
            ->setBadge($badge + 1)
            ->setData(['post_id' => $this->post->id]);
    }
}
