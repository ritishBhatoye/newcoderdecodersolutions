import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          We grow personal brands by 2-5x and build autopilot lead gen ecosystems for founders and online service providers in 90-120 days, guaranteed
        </h1>
        <Link href="#grow" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors inline-block">
          YES, GROW MY BRAND!
        </Link>
        <div className="mt-12">
          <p className="text-gray-600 mb-4">Trusted By:-</p>
          <div className="flex justify-center space-x-8">
            {/* Add your client logos here */}
            {/* Example: <Image src="/client-logo.svg" alt="Client" width={100} height={50} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
