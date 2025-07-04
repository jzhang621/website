import Link from 'next/link';

interface SuperscriptProps {
  text: string;
  href: string;
}

const Superscript: React.FC<SuperscriptProps> = ({ text, href }) => {
  return (
    <sup>
      <Link href={href} className="text-blue-500 hover:text-blue-700">
        {text}
      </Link>
    </sup>
  );
};

export default Superscript;
