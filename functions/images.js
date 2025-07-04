export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Extract the Firebase Storage URL from the path
  const firebaseUrl = url.searchParams.get('url');

  if (!firebaseUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // Validate that it's a Firebase Storage URL
  if (!firebaseUrl.includes('firebasestorage.googleapis.com') && !firebaseUrl.includes('firebasestorage.app')) {
    return new Response('Invalid Firebase Storage URL', { status: 400 });
  }

  // Create cache key
  const cacheKey = new Request(firebaseUrl);
  const cache = caches.default;

  // Check cache first
  let response = await cache.match(cacheKey);

  if (!response) {
    // Fetch from Firebase Storage
    response = await fetch(firebaseUrl, {
      headers: {
        'User-Agent': 'Cloudflare-Worker-Image-Cache/1.0'
      }
    });

    if (response.ok) {
      // Clone response for caching
      const responseClone = response.clone();

      // Set cache headers
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=31536000'); // 1 year
      headers.set('CDN-Cache-Control', 'public, max-age=31536000');
      headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=31536000');
      headers.set('X-Cached-By', 'Cloudflare-Worker');

      // Create new response with cache headers
      response = new Response(responseClone.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });

      // Cache the response
      context.waitUntil(cache.put(cacheKey, response.clone()));
    }
  } else {
    // Add cache hit header
    const headers = new Headers(response.headers);
    headers.set('X-Cache-Status', 'HIT');

    response = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  }

  return response;
}
