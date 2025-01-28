<?php
/*
 * LaraClassifier - Classified Ads Web Application
 * Copyright (c) BeDigit. All Rights Reserved
 *
 * Website: https://laraclassifier.com
 * Author: BeDigit | https://bedigit.com
 *
 * LICENSE
 * -------
 * This software is furnished under a license and may be used and copied
 * only in accordance with the terms of such license and with the inclusion
 * of the above copyright notice. If you Purchased from CodeCanyon,
 * Please read the full License from here - https://codecanyon.net/licenses/standard
 */

namespace App\Notifications;

use App\Helpers\UrlGen;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Post;
use ExpoSDK\ExpoMessage;
use NotificationChannels\Twilio\TwilioChannel;
use NotificationChannels\Twilio\TwilioSmsMessage;

class PostActivated extends Notification implements ShouldQueue
{
	use Queueable;

	protected $post;

	public function __construct(Post $post)
	{
		$this->post = $post;
	}

	public function via($notifiable)
	{
		$via = ['expo'];

		// Is email can be sent?
		$emailNotificationCanBeSent = (
			config('settings.mail.confirmation') == '1'
			&& !empty($this->post->email)
			&& !empty($this->post->email_verified_at)
		);

		if ($emailNotificationCanBeSent) {
			$via[] = 'mail';
		}

		return $via;
	}

	public function toMail($notifiable)
	{
		$postUrl = UrlGen::post($this->post);

		return (new MailMessage)
			->subject(trans('mail.post_activated_title', ['title' => str($this->post->title)->limit(50)]))
			->greeting(trans('mail.post_activated_content_1'))
			->line(trans('mail.post_activated_content_2', [
				'postUrl' => $postUrl,
				'title'   => $this->post->title,
			]))
			->line(trans('mail.post_activated_content_3'))
			->line(trans('mail.post_activated_content_4', ['appName' => config('app.name')]))
			->salutation(trans('mail.footer_salutation', ['appName' => config('app.name')]));
	}

	public function toVonage($notifiable)
	{
		return (new VonageMessage())->content($this->smsMessage())->unicode();
	}

	public function toTwilio($notifiable)
	{
		return (new TwilioSmsMessage())->content($this->smsMessage());
	}

	public function toExpo($notifiable)
	{
		return new ExpoMessage($this->expoMessage($notifiable));
	}

	protected function smsMessage()
	{
		return trans('sms.post_activated_content', ['appName' => config('app.name'), 'title' => $this->post->title]);
	}

	protected function expoMessage($notifiable)
	{
		$badge = $notifiable->user->unreadNotifications->count();

		return [
			'title'	=> $this->post->title,
			'body' => "'Your listing {$this->post->title} has been activated",
			'sound' => 'default',
			'data' => ['post' => $this->post, 'type' => 'post_notification'],
			'badge' => $badge + 1,
		];
	}
}
