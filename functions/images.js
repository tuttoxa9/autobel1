export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Extract the file path from the URL
  // Example: /путь/к/картинке.jpg from https://images.belautocenter.by/путь/к/картинке.jpg
  const filePath = url.pathname.substring(1); // Remove leading slash

  if (!filePath) {
    return new Response('Missing file path', { status: 400 });
  }

  // Construct Firebase Storage URL
  // First encode the entire path, then replace encoded slashes with %2F
  let firebaseEncodedPath = encodeURIComponent(filePath);
  firebaseEncodedPath = firebaseEncodedPath.replace(/%2F/g, '%2F'); // This ensures slashes are properly encoded

  const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/autobel-a6390.appspot.com/o/${firebaseEncodedPath}?alt=media`;

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
