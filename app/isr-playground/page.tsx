export const revalidate = 12.5; // seconds

export default async function ISRPlayground() {
  console.log(`🔄 REGENERATING: ${new Date().toISOString()}`);

  const response = await fetch("https://api.vercel.app/blog");

  const data = await response.json();
  const fetchTime = new Date().toISOString();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ISR Playground</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">ISR Details</h2>
        <p>
          <strong>API:</strong> https://api.vercel.app/blog
        </p>
        <p>
          <strong>ISR:</strong> export const revalidate = 10
        </p>
        <p>
          <strong>Page Generation Time:</strong> {fetchTime}
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Fetched Data</h2>
        <pre className="text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>How to verify ISR:</strong>
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Note the &ldquo;Page Generation Time&rdquo; above</li>
          <li>Wait 10+ seconds, then refresh</li>
          <li>Check console logs for regeneration</li>
          <li>Entire page HTML gets regenerated every 10 seconds</li>
        </ol>
      </div>
    </div>
  );
}
