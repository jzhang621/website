export async function GET() {
  // Wait 3 seconds to simulate slow API
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
  
  return Response.json({
    timestamp,
    message: 'This response took 3 seconds to generate',
    generated_at: new Date().toISOString()
  });
}