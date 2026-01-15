import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
                M
              </div>
              <span className="font-bold text-xl">MOTTA</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Your trusted marketplace for electronics and technology. Quality products, competitive prices, and exceptional customer service.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Shipping Info</a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Returns</a>
                </Link>
              </li>
              <li>
                <Link href="/track-order">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Track Order</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/sitemap">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">Sitemap</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mt-12 pt-8 border-t">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-full"
              />
              <Button className="rounded-full px-6">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Motta Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
