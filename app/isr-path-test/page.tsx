export const revalidate = 3600; // 1 hour (60 * 60)

export default function ISRPathTest() {
  const now = new Date();
  const timestamp = now.toISOString();
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">ISR Path-Based Revalidation Test</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <p className="text-lg mb-2">
          <strong>Generated at:</strong> {timestamp}
        </p>
        <p className="text-sm text-gray-600">
          This page uses ISR with a 60-second revalidation interval and can be invalidated on-demand using revalidatePath.
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How This Works</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>This page is statically generated at build time</li>
          <li>It automatically revalidates every 60 seconds when accessed</li>
          <li>It can be manually revalidated using the revalidation API</li>
          <li>The timestamp above shows when the page was last generated</li>
        </ul>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Note the current timestamp above</li>
          <li>Call the revalidation API: <code className="bg-gray-200 px-2 py-1 rounded">POST /api/revalidate</code></li>
          <li>Refresh this page to see the updated timestamp</li>
          <li>Or wait 60 seconds and refresh to see automatic revalidation</li>
        </ol>
      </div>
    </div>
  );
}