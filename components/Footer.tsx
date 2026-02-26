"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Truck,
  PackageCheck,
  Apple,
  Smartphone,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Users,
  Package,
  Store,
  UtensilsCrossed,
  ChevronDown,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

export default function Footer() {
  const [activeTab, setActiveTab] = useState("Frequent Questions");
  const [email, setEmail] = useState("");

  const tabs = [
    "Frequent Questions",
    "Who we are?",
    "Partner Program",
    "Help & Support",
  ];

  const faqItems = [
    "How does Order.UK work?",
    "What payment methods are accepted?",
    "Can I track my order in real-time?",
    "Are there any special discounts or promotions available?",
    "Is Order.UK available in my area?",
  ];

  return (
    <footer className="bg-gray-50">
      {/* Know More About Us Section */}
      <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Know more about us!
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ Questions */}
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div key={item} className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-800">{item}</h3>
                </div>
              ))}
            </div>

            {/* Process Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Place an Order Card */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 mb-3 relative shadow-md">
                  <ShoppingBag
                    className="w-16 h-16 text-orange-500 mx-auto"
                    strokeWidth={1.5}
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">
                  Place an Order!
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Place order through our website or Mobile app
                </p>
              </div>

              {/* Track Progress Card */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 mb-3 relative shadow-md">
                  <Truck
                    className="w-16 h-16 text-orange-500 mx-auto"
                    strokeWidth={1.5}
                  />
                  <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Track Progress</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  You can track your order status with delivery time
                </p>
              </div>

              {/* Get your Order Card */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 mb-3 relative shadow-md">
                  <PackageCheck
                    className="w-16 h-16 text-orange-500 mx-auto"
                    strokeWidth={1.5}
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <PackageCheck
                      className="w-4 h-4 text-white"
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">
                  Get your Order!
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Receive your order at a lightning fast speed!
                </p>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Order.UK simplifies the food ordering process. Browse through our
            diverse menu, select your favorite dishes, and proceed to checkout.
            Your delicious meal will be on its way to your doorstep in no time!
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <Users
                className="w-12 h-12 mx-auto mb-3 opacity-90"
                strokeWidth={1.5}
              />
              <h3 className="text-4xl font-bold mb-2">546+</h3>
              <p className="text-sm opacity-90">Registered Riders</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <Package
                className="w-12 h-12 mx-auto mb-3 opacity-90"
                strokeWidth={1.5}
              />
              <h3 className="text-4xl font-bold mb-2">789,900+</h3>
              <p className="text-sm opacity-90">Orders Delivered</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <Store
                className="w-12 h-12 mx-auto mb-3 opacity-90"
                strokeWidth={1.5}
              />
              <h3 className="text-4xl font-bold mb-2">690+</h3>
              <p className="text-sm opacity-90">Restaurants Partnered</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <UtensilsCrossed
                className="w-12 h-12 mx-auto mb-3 opacity-90"
                strokeWidth={1.5}
              />
              <h3 className="text-4xl font-bold mb-2">17,457+</h3>
              <p className="text-sm opacity-90">Food Items</p>
            </div>
          </div>
        </div>
      </section>

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
