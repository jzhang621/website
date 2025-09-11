export default function CachePage() {
  const renderTime = new Date().toISOString();
  
  return (
    <div>
      <h1>Cache Test Page</h1>
      <p>This page demonstrates caching behavior with Next.js.</p>
      <p>The cache headers are configured in next.config.mjs to have max-age=60, public.</p>
      <p><strong>Rendered at:</strong> {renderTime}</p>
      <p>If caching is working correctly, this timestamp should remain the same for 60 seconds.</p>
    </div>
  );
}