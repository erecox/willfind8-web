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
use App\Helpers\UrlGen;
use ExpoSDK\ExpoMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Carbon;

class PostNotification extends Notification implements ShouldQueue
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
		$postUrl = UrlGen::post($this->post);
		
		return (new MailMessage)
			->subject(trans('mail.post_notification_title'))
			->greeting(trans('mail.post_notification_content_1'))
			->line(trans('mail.post_notification_content_2', ['advertiserName' => $this->post->contact_name]))
			->line(trans('mail.post_notification_content_3', [
				'postUrl' => $postUrl,
				'title'   => $this->post->title,
				'now'     => Date::format(Carbon::now(Date::getAppTimeZone())),
				'time'    => Carbon::now(Date::getAppTimeZone())->format('H:i'),
			]))
			->salutation(trans('mail.footer_salutation', ['appName' => config('app.name')]));
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
			'body' => trans('mail.post_notification_content_2', ['advertiserName' => $this->post->contact_name]),
			'sound' => 'default',
			'data' => ['post'=>$this->post, 'type' => 'post_notification'],
			'badge' => $badge + 1,
		];
	}
}
