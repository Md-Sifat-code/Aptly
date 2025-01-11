import React from "react";
import home from "/okay.png";
export default function Footer() {
  return (
    <footer className="bg-gray-300 border-t mt-12 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Company Info */}
          <aside className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img className="w-[120px]" src={home} alt="" />
            </div>
            <p className="text-black">
              <strong>Bari Bazar BD</strong>
              <br />
              Providing reliable Home since 2024
            </p>
          </aside>

          {/* Services */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-black">Services</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover text-black">
                  Buy
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-black">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-black">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-black">
                  Advertisement
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-black">Company</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover text-black">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-black">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-black">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-black">
                  Press kit
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-black">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover text-white">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-white">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-white">
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
