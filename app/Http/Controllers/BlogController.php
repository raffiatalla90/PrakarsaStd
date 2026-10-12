<?php

namespace App\Http\Controllers;

use App\Support\Blog;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'posts' => Blog::summaries(),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Blog::find($slug);

        abort_if($post === null, 404);

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'related' => Blog::related($slug),
        ]);
    }
}
