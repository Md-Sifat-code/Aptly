import React from "react";
import home from "/bariss.png";
export default function Footer() {
  return (
    <footer className="bg-[#84b5b9] border-t mt-12 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Company Info */}
          <aside className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img className="w-[50px]" src={home} alt="" />
            </div>
            <p className="text-gray-700">
              <strong>Bari Bazar BD</strong>
              <br />
              Providing reliable Home since 2024
            </p>
          </aside>

          {/* Services */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-gray-800">Services</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Branding
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Advertisement
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-gray-800">Company</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Press kit
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-gray-800">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-gray-600">
                  Cookie policy
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
