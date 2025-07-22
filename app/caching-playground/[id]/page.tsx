export default async function CachingPlayground({ params }: { params: Promise<{ id: string }> }) {
  // need to force this request to be dynamic.
  const { id } = await params;

  const response = await fetch("https://api.vercel.app/blog", {
    cache: "force-cache",
  });

  const data = await response.json();
  const fetchTime = new Date().toISOString();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Caching Playground</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Data Cache Details</h2>
        <p>
          <strong>API:</strong> https://api.vercel.app/blog
        </p>
        <p>
          <strong>Cache Strategy:</strong> next: &#123; revalidate: 30 &#125;
        </p>
        <p>
          <strong>ID Parameter:</strong> {id}
        </p>
        <p>
          <strong>Component Render Time:</strong> {fetchTime}
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Fetched Data</h2>
        <pre className="text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>How to verify data caching:</strong>
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Check console logs - should only see cache hit every 30s</li>
          <li>Page still gets generated on each request (note render time changes)</li>
          <li>But the fetch response is cached for 30 seconds</li>
          <li>This is different from ISR - page isn&rsquo;t cached, just the data</li>
        </ol>
      </div>
    </div>
  );
}
