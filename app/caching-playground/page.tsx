export default async function CachingPlayground() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'force-cache'
  });
  
  const data = await response.json();
  const fetchTime = new Date().toISOString();
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Caching Playground</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Fetch Details</h2>
        <p><strong>API:</strong> https://jsonplaceholder.typicode.com/posts/1</p>
        <p><strong>Cache:</strong> force-cache</p>
        <p><strong>Fetch Time:</strong> {fetchTime}</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Fetched Data</h2>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>How to verify caching:</strong></p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Note the "Fetch Time" above</li>
          <li>Refresh this page multiple times</li>
          <li>The fetch time should remain the same (cached)</li>
          <li>Deploy to Vercel and the time should persist across deployments</li>
        </ol>
      </div>
    </div>
  );
}