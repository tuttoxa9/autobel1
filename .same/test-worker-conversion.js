// Test script to verify Cloudflare Worker URL conversion logic

function convertToFirebaseUrl(filePath) {
  // Construct Firebase Storage URL
  // Convert path back to Firebase Storage format
  const encodedPath = filePath.replace(/\//g, '%2F');
  return `https://firebasestorage.googleapis.com/v0/b/autobel-a6390.appspot.com/o/${encodeURIComponent(encodedPath)}?alt=media`;
}

// Test cases - these would be the paths extracted from URLs like:
// https://images.belautocenter.by/cars/audi-a4.jpg
const testPaths = [
  'cars/audi-a4.jpg',
  'uploads/logo.png',
  'путь/к/картинке.jpg'
];

console.log('Cloudflare Worker URL Conversion Test:');
console.log('=====================================');

testPaths.forEach((path, index) => {
  const firebaseUrl = convertToFirebaseUrl(path);
  console.log(`\nTest ${index + 1}:`);
  console.log(`Input path: ${path}`);
  console.log(`Firebase URL: ${firebaseUrl}`);
});

console.log('\n\nThis simulates what happens when someone requests:');
console.log('https://images.belautocenter.by/cars/audi-a4.jpg');
console.log('↓');
console.log('Worker fetches: https://firebasestorage.googleapis.com/v0/b/autobel-a6390.appspot.com/o/cars%252Faudi-a4.jpg?alt=media');
