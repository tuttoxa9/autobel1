// Test script to verify URL conversion logic

// Mock the environment variable
process.env.NEXT_PUBLIC_IMAGE_CACHE_WORKER_URL = 'https://images.belautocenter.by';

// Import the function (in real environment)
// For testing, we'll copy the function here
function getCachedImageUrl(firebaseUrl) {
  const WORKER_URL = process.env.NEXT_PUBLIC_IMAGE_CACHE_WORKER_URL || 'https://images.belautocenter.by';

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

  try {
    // Parse Firebase Storage URL and extract the path
    const url = new URL(firebaseUrl);

    // Extract path from Firebase Storage URL
    // Example: /v0/b/autobel-a6390.appspot.com/o/путь%2Fк%2Fкартинке.jpg
    const pathMatch = url.pathname.match(/\/v0\/b\/[^\/]+\/o\/(.+)/);

    if (pathMatch && pathMatch[1]) {
      // Decode the path and convert %2F back to /
      const decodedPath = decodeURIComponent(pathMatch[1]);

      // Remove any query parameters like ?alt=media
      const cleanPath = decodedPath.split('?')[0];

      // Construct new URL: https://images.belautocenter.by/путь/к/картинке.jpg
      return `${WORKER_URL}/${cleanPath}`;
    }
  } catch (error) {
    console.warn('Failed to parse Firebase URL:', firebaseUrl, error);
  }

  // Fallback to original URL if parsing fails
  return firebaseUrl;
}

// Test cases
const testUrls = [
  'https://firebasestorage.googleapis.com/v0/b/autobel-a6390.appspot.com/o/cars%2Faudi-a4.jpg?alt=media&token=abc123',
  'https://firebasestorage.googleapis.com/v0/b/autobel-a6390.appspot.com/o/uploads%2Flogo.png?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/autobel-a6390.appspot.com/o/путь%2Fк%2Fкартинке.jpg?alt=media&token=xyz789'
];

console.log('URL Conversion Test Results:');
console.log('============================');

testUrls.forEach((originalUrl, index) => {
  const convertedUrl = getCachedImageUrl(originalUrl);
  console.log(`\nTest ${index + 1}:`);
  console.log(`Original:  ${originalUrl}`);
  console.log(`Converted: ${convertedUrl}`);
});

console.log('\n\nExpected format:');
console.log('https://images.belautocenter.by/cars/audi-a4.jpg');
console.log('https://images.belautocenter.by/uploads/logo.png');
console.log('https://images.belautocenter.by/путь/к/картинке.jpg');
