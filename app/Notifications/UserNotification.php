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
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Carbon;

class UserNotification extends Notification implements ShouldQueue
{
	use Queueable;
	
	protected $user;
	
	public function __construct($user)
	{
		$this->user = $user;
	}
	
	public function via($notifiable)
	{
		return ['mail','expo'];
	}
	
	public function toMail($notifiable)
	{
		return (new MailMessage)
			->subject(trans('mail.user_notification_title'))
			->greeting(trans('mail.user_notification_content_1'))
			->line(trans('mail.user_notification_content_2', ['name' => $this->user->name]))
			->line(trans('mail.user_notification_content_3', [
				'now'       => Date::format(Carbon::now(Date::getAppTimeZone())),
				'time'      => Carbon::now(Date::getAppTimeZone())->format('H:i'),
				'authField' => $this->user->auth_field ?? '-',
				'email'     => !empty($this->user->email) ? $this->user->email : '-',
				'phone'     => !empty($this->user->phone) ? $this->user->phone : '-',
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
			'title'	=> trans('mail.user_notification_title'),
			'body' => trans('mail.user_notification_content_2', ['name' => $this->user->name]),
			'sound' => 'default',
			'data' => ['user' => $this->user, 'type' => 'user_notification'],
			'badge' => $badge + 1,
		];
	}
}
