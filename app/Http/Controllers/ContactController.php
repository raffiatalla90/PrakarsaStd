<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public const SERVICES = ['Website Development', 'Web Application', 'UI/UX Design', 'AI Solutions'];

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'business' => ['nullable', 'string', 'max:150'],
            'service' => ['nullable', 'string', 'in:'.implode(',', self::SERVICES)],
            'message' => ['required', 'string', 'min:10', 'max:3000'],
        ], [
            'name.required' => 'Isi nama Anda.',
            'email.required' => 'Isi alamat email Anda.',
            'email.email' => 'Isi alamat email yang valid.',
            'service.in' => 'Pilih salah satu layanan yang tersedia.',
            'message.required' => 'Ceritakan kebutuhan Anda.',
            'message.min' => 'Ceritakan kebutuhan Anda minimal 10 karakter.',
            'message.max' => 'Pesan terlalu panjang, maksimal 3000 karakter.',
        ]);

        ContactMessage::create($data);

        if ($receiver = config('prakarsa.contact_receiver')) {
            $body = "Nama: {$data['name']}\nEmail: {$data['email']}\nBisnis: ".($data['business'] ?? '-')
                ."\nLayanan: ".($data['service'] ?? '-')."\n\n{$data['message']}";

            Mail::raw($body, fn ($mail) => $mail->to($receiver)->replyTo($data['email'], $data['name'])
                ->subject('Kebutuhan proyek dari '.$data['name']));
        }

        return back()->with('contact_sent', true);
    }
}
