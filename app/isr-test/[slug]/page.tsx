export default function ISRTest({ params }: { params: { slug: string } }) {
   

    console.log("Hello, where will this be logged?");
    return <div>ISR Test - Slug: {params.slug}</div>;
}