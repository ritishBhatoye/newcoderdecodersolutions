import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Company Logo" width={40} height={40} />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#process" className="text-gray-800 hover:text-gray-600">Process</Link></li>
            <li><Link href="#testimonials" className="text-gray-800 hover:text-gray-600">Testimonials</Link></li>
            <li><Link href="#faqs" className="text-gray-800 hover:text-gray-600">FAQs</Link></li>
          </ul>
        </nav>
        <Link href="#contact" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          GET IN TOUCH
        </Link>
      </div>
    </header>
  );
}
