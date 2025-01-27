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

use App\Helpers\Date;
use ExpoSDK\ExpoMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Carbon;
use NotificationChannels\Twilio\TwilioChannel;
use NotificationChannels\Twilio\TwilioSmsMessage;

class PostDeleted extends Notification implements ShouldQueue
{
	use Queueable;
	
	protected $post;
	
	public function __construct($post)
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
		return (new MailMessage)
			->subject(trans('mail.post_deleted_title', ['title' => $this->post->title]))
			->greeting(trans('mail.post_deleted_content_1'))
			->line(trans('mail.post_deleted_content_2', [
				'title'   => $this->post->title,
				'now'     => Date::format(Carbon::now(Date::getAppTimeZone())),
				'appUrl'  => url('/'),
				'appName' => config('app.name'),
			]))
			->line(trans('mail.post_deleted_content_3'))
			->line('<br>')
			->line(trans('mail.post_deleted_content_4'))
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
	
	protected function expoMessage($notifiable)
	{
		$badge = $notifiable->unreadNotifications->count();

		return [
			'title'	=> $this->post->title,
			'body' => "Your listing {$this->post->title} has been deleted",
			'sound' => 'default',
			'data' => [],
			'badge' => $badge + 1,
		];
	}
	
	protected function smsMessage()
	{
		return trans('sms.post_deleted_content', ['appName' => config('app.name'), 'title' => $this->post->title]);
	}
}
