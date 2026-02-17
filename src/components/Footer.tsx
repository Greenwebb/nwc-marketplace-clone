import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Send, CreditCard, Smartphone } from "lucide-react";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
     
      // { name: "Affiliate", href: "/affiliate" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  shop: {
    title: "Shop",
    links: [
      { name: "New Arrivals", href: "/shop?sort=newest" },
      { name: "Accessories", href: "/shop?category=accessories" },
      { name: "Sale", href: "/shop?sale=true" },
      { name: "All Collections", href: "/shop" },
    ],
  },
  help: {
    title: "Help",
    links: [
      { name: "Customer Service", href: "/help" },
      { name: "My Account", href: "/dashboard" },
      { name: "Find a Store", href: "/stores" },
      { name: "Legal & Privacy", href: "/privacy" },
      { name: "Gift Card", href: "/gift-cards" },
    ],
  },
  categories: {
    title: "Categories",
    links: [
      { name: "Laptops & Computers", href: "/shop?category=laptops-computers" },
      { name: "Cameras & Photo", href: "/shop?category=cameras" },
      { name: "Smart Phones & Tablets", href: "/shop?category=cell-phones" },
      { name: "Video Games & Systems", href: "/shop?category=gaming" },
      { name: "Home Television", href: "/shop?category=tvs-video" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#DADFE3]">
      {/* Main Footer Content */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo & Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <Link href="/">
              <a className="flex flex-col leading-none mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-3xl font-bold tracking-tight text-primary">New<span className="text-secondar">world</span></span>
                    <div className="mb-2 flex gap-0.5">                      
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                      
                    </div>
                  </div>
                  <span className="text-[11px] tracking-wide text-primary">Marketplace</span>
                </a>
            </Link>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-primary mb-3">
                Subscribe to our Newsletter
              </h4>
              <p className="text-sm text-[#7C818B] mb-4">
                Get all the latest information on Events, Sales and Offers.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="h-[46px] bg-[#fff] border-0 text-sm text-primary placeholder:text-[#7C818B] focus-visible:ring-1 focus-visible:ring-[#11248F] rounded-2xl pr-12"
                  />
                </div>
                <Button className="h-[46px] px-4 bg-primary hover:bg-[#0d1c6e] rounded-2xl">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C818B] hover:text-[#11248F] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">
              {footerLinks.company.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-sm text-[#7C818B] hover:text-[#11248F] transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">
              {footerLinks.shop.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-sm text-[#7C818B] hover:text-[#11248F] transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">
              {footerLinks.help.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-sm text-[#7C818B] hover:text-[#11248F] transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div className="hidden lg:block">
            <h4 className="text-sm font-semibold text-primary mb-4">
              {footerLinks.categories.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.categories.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-sm text-[#7C818B] hover:text-[#11248F] transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#DADFE3]">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-[#7C818B] text-center md:text-left">
              © {new Date().getFullYear()} Newworld Marketplace. All Rights Reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#7C818B]">We Accept:</span>
              <div className="flex items-center gap-3">
                <div className="h-8 px-3 bg-primary rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium text-primary border border-[#DADFE3]">
                  <CreditCard className="h-3.5 w-3.5 text-white" />
                  <span className="text-white">ATM / Credit Card</span>
                </div>
                <div className="h-8 px-3 bg-primary rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium text-primary border border-[#DADFE3]">
                  <Smartphone className="h-3.5 w-3.5 text-white" />
                  <span className="text-white">Mobile Money</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
