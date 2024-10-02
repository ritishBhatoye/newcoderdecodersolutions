import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Company Name</h3>
            <p className="mb-4">Your trusted partner in digital solutions.</p>
            <p>© 2024 Company Name. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-gray-300">Services</Link></li>
              <li><Link href="#about" className="hover:text-gray-300">About</Link></li>
              <li><Link href="#portfolio" className="hover:text-gray-300">Portfolio</Link></li>
              <li><Link href="#contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">123 Business Street, City, Country</p>
            <p className="mb-2">Phone: +1 234 567 890</p>
            <p>Email: info@company.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
