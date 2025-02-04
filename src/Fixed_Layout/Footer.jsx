import React, { useContext } from "react";
import { FlatContext } from "../Context_Api/FlatContext"; // Assuming you're using this context to track loading state
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import home from "/okay.png";

export default function Footer() {
  const { loading } = useContext(FlatContext); // Assuming 'loading' is a part of context

  // If loading, don't render the footer
  if (loading) {
    return null;
  }

  // Utility function to convert text to a URL-friendly route
  const convertToRoute = (text) => {
    return `/${text.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <footer className="bg-gray-300 border-t mt-12 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Company Info */}
          <aside className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img className="w-[120px]" src={home} alt="Company Logo" />
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
                <Link
                  to={convertToRoute("Buy")}
                  className="link link-hover text-black"
                >
                  Buy
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Design")}
                  className="link link-hover text-black"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Marketing")}
                  className="link link-hover text-black"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Advertisement")}
                  className="link link-hover text-black"
                >
                  Advertisement
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-black">Company</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to={convertToRoute("About us")}
                  className="link link-hover text-black"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Contact")}
                  className="link link-hover text-black"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Jobs")}
                  className="link link-hover text-black"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Press kit")}
                  className="link link-hover text-black"
                >
                  Press kit
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav>
            <h6 className="text-lg font-bold mb-4 text-black">Legal</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to={convertToRoute("Terms of use")}
                  className="link link-hover text-black"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Privacy policy")}
                  className="link link-hover text-black"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to={convertToRoute("Cookie policy")}
                  className="link link-hover text-black"
                >
                  Cookie policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
