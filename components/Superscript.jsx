import Link from 'next/link';

const Superscript = ({ text, href }) => {
  return (
    <sup>
      <Link href={href} className="text-blue-500 hover:text-blue-700">
        {text}
      </Link>
    </sup>
  );
};

export default Superscript;
