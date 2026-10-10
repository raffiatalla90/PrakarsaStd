<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'contact' => [
                'email' => config('prakarsa.public_email'),
                'whatsapp' => preg_replace('/\D+/', '', (string) config('prakarsa.whatsapp')),
                'instagram' => config('prakarsa.instagram'),
                'linkedin' => config('prakarsa.linkedin'),
            ],
            'flash' => ['contact_sent' => (bool) $request->session()->get('contact_sent')],
        ];
    }
}
