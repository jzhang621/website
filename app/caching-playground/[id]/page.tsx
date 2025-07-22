export default async function CachingPlayground({ params }: { params: Promise<{ id: string }> }) {
  // need to force this request to be dynamic.
  const { id } = await params;

  const fetchStart = Date.now();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/timestamp`, {
    cache: "force-cache",
  });
  const fetchDuration = Date.now() - fetchStart;

  const data = await response.json();
  const fetchTime = new Date().toISOString();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Caching Playground</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Data Cache Details</h2>
        <p>
          <strong>API:</strong> /api/timestamp (3s delay)
        </p>
        <p>
          <strong>Cache Strategy:</strong> force-cache
        </p>
        <p>
          <strong>ID Parameter:</strong> {id}
        </p>
        <p>
          <strong>Fetch Duration:</strong> {fetchDuration}ms
        </p>
        <p>
          <strong>Component Render Time:</strong> {fetchTime}
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Fetched Data</h2>
        <pre className="text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
