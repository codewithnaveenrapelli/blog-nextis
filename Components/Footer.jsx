import Link from "next/link";
import FooterContact from "./FooterContact";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-semibold">
            Practical Tech Guide
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            Learning Adobe Experience Manager and Java through real
            development problems, debugging and architecture decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-medium mb-4">Connect</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">YouTube</a>
          </div>
        </div>

        {/* NEW: Quick Contact */}
        <FooterContact />

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center py-5 text-sm">
        © {new Date().getFullYear()} Practical Tech Guide — Built while learning AEM
      </div>

    </footer>
  );
}
