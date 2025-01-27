<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpoDevice;
use App\Models\ExpoNotification;
use App\Models\Post;
use App\Models\User;
use App\Notifications\ExamplePushNotification;
use Illuminate\Http\Request;

class ExpoNotificationController extends Controller
{

    public function index()
    {
        if (!auth('sanctum')->check()) {
            return $this->respondUnAuthorized();
        }
        $user = auth('sanctum')->user();

        $notifications = $user->notifications()->whereIn('status', ['read', 'delivered']);

        // Get the embed query parameter
        $embed = explode(',', request()->get('embed', ""));
        if (in_array('user', $embed))
            $notifications->with('user');

        $result = $notifications->latest()->paginate(request()->get('perPage', 10));

        return response()->json([
            'success' => true,
            'result' => $result,
        ]);
    }


    public function devices()
    {
        if (!auth('sanctum')->check()) {
            return $this->respondUnAuthorized();
        }
        $user = auth('sanctum')->user();

        // Get the devices for the authenticated user
        $devices = $user->devices();

         // Get the embed query parameter
         $embed = explode(',', request()->get('embed', ""));
        // Check if the user wants to embed the user relationship
        if (in_array('user', $embed))
            $devices->with('user');

        $result = $devices->paginate(request()->get('perPage', 10));

        return response()->json([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function storeDeviceToken(Request $request)
    {
        if (!auth('sanctum')->check()) {
            return $this->respondUnAuthorized();
        }

        $request->validate([
            'token' => 'required|string',
            'device_name' => 'nullable|string',
            'platform' => 'nullable|string',
        ]);

        $user = auth()->user(); // Get the authenticated user

        // Store or update the device token
        $device = ExpoDevice::updateOrCreate(
            ['token' => $request->token],
            [
                'user_id' => $user->id,
                'device_name' => $request->device_name,
                'platform' => $request->platform,
            ]
        );

        return response()->json([
            'success' => true,
            'result' => $device,
            'message' => 'Device token stored successfully.'
        ]);
    }

    public function markAsRead($Ids)
    {
        if (!auth('sanctum')->check()) {
            return $this->respondUnAuthorized();
        }

        $notificationIds = explode(',', $Ids);
        ExpoNotification::markAsRead($notificationIds);

        if (count($notificationIds) === 1) {
            return response()->json([
                'success' => true,
                'ids' => $notificationIds,
                'message' => 'Notification marked as read.'
            ]);
        } else {
            return response()->json([
                'success' => true,
                'ids' => $notificationIds,
                'message' => 'Notifications marked as read.'
            ]);
        }
    }

    // make all notifications as read
    public function markAllAsRead()
    {
        if (!auth('sanctum')->check()) {
            return $this->respondUnAuthorized();
        }

        $user = auth('sanctum')->user();
        if (!$user instanceof User) {
            return $this->respondUnAuthorized();
        }

        $notificationIds = $user->notifications()->where('status', 'delivered')->pluck('id')->toArray();
        // Mark all notifications as read
        ExpoNotification::markAllAsReadFor($user->id);

        return response()->json([
            'success' => true,
            'ids' => $notificationIds,
            'message' => 'All notifications marked as read.'
        ]);
    }

    public function testNotification(): \Illuminate\Http\JsonResponse
    {
        $post =  Post::first();

        // Get the user
        $user = auth('sanctum')->user();
        $user->notify(new ExamplePushNotification($post));

        return response()->json([
            'success' => true,
            'message' => 'Notification sent and stored successfully.'
        ]);
    }
}
