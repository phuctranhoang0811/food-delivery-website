"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  UtensilsCrossed,
  Send,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gray-50">
      {/* Main Footer */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <UtensilsCrossed className="w-8 h-8 text-orange-500" />
                <div className="text-2xl font-bold">
                  Order<span className="text-orange-500">.uk</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    width={150}
                    height={50}
                    className="h-12 w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    width={150}
                    height={50}
                    className="h-12 w-auto"
                  />
                </a>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Company # 490039-445, Registered with House of companies.
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold">
                  Get Exclusive Deals in your Inbox
                </h3>
              </div>
              <div className="flex mb-4 shadow-lg">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-l-full bg-gradient-to-r from-orange-50 to-yellow-50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                />
                <button className="bg-orange-500 px-6 py-3 rounded-r-full hover:bg-orange-600 transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                We won't spam, read our email policy
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Legal Pages */}
            <div>
              <h3 className="font-semibold mb-4">Legal Pages</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms and conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Modern Slavery Statement
                  </a>
                </li>
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="font-semibold mb-4">Important Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Get help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Add your restaurant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sign up to deliver
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Create a business account
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>Order.uk Copyright 2024, All Rights Reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
                <a href="#" className="hover:text-white">
                  Do not sell or share my personal information
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
