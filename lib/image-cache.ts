// Cloudflare Worker URL for image caching
const WORKER_URL = process.env.NEXT_PUBLIC_IMAGE_CACHE_WORKER_URL || 'https://images.belautocenter.by';

/**
 * Converts Firebase Storage URL to cached URL via Cloudflare Worker
 * @param firebaseUrl - Original Firebase Storage URL
 * @returns Cached URL via Cloudflare Worker
 */
export function getCachedImageUrl(firebaseUrl: string): string {
  // If no Firebase URL provided, return empty string
  if (!firebaseUrl) {
    return '';
  }

  // If it's already a cached URL, return as is
  if (firebaseUrl.includes(WORKER_URL)) {
    return firebaseUrl;
  }

  // If it's not a Firebase Storage URL, return as is
  if (!firebaseUrl.includes('firebasestorage.googleapis.com') &&
      !firebaseUrl.includes('firebasestorage.app')) {
    return firebaseUrl;
  }

  // Convert to cached URL
  const encodedUrl = encodeURIComponent(firebaseUrl);
  return `${WORKER_URL}?url=${encodedUrl}`;
}

/**
 * Converts array of Firebase Storage URLs to cached URLs
 * @param firebaseUrls - Array of Firebase Storage URLs
 * @returns Array of cached URLs
 */
export function getCachedImageUrls(firebaseUrls: string[]): string[] {
  return firebaseUrls.map(url => getCachedImageUrl(url));
}
