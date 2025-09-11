export const revalidate = 60;

export default async function ISRTest({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  console.log("Hello, where will this be logged?");
  return <div>ISR Test - Slug: {slug}</div>;
}
