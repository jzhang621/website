export const revalidate = 60;

export default async function ISRTest() {
  console.log("Hello, where will this be logged? Expecting to see this as a background job.");
  return <div>ISR Test</div>;
}
