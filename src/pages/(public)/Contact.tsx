import { useState } from "react";
import { Phone, MessageCircle, HelpCircle, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToPolicy: false,
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToPolicy) {
    toast.error("Please agree to our privacy policy to continue.");
      return;
    }
    toast.success("Message sent! We'll get back to you as soon as possible.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      agreeToPolicy: false,
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed! You've been added to our newsletter.");
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#F5F5F7] py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-4">
            We're here for you
          </h1>
          <p className="text-[#7C818B] text-center mb-12">
            Our friendly team is always here to chat.
          </p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Customer Service */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[#11248F]" />
                </div>
              </div>
              <h3 className="font-semibold text-primary mb-2">Customer Service</h3>
              <p className="text-[#11248F] font-medium mb-1">1-800-237-8289</p>
              <p className="text-sm text-[#7C818B]">Call us now (Mon-Fri 7am-6pm CT)</p>
            </div>

            {/* Chat */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-[#11248F]" />
                </div>
              </div>
              <h3 className="font-semibold text-primary mb-2">Chat with us here!</h3>
              <button className="text-[#11248F] font-medium mb-1 hover:underline">
                Chat Now
              </button>
              <p className="text-sm text-[#7C818B]">Daily: 8 am to 8 pm CT</p>
            </div>

            {/* Help Center */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-[#11248F]" />
                </div>
              </div>
              <h3 className="font-semibold text-primary mb-2">How can we help you today?</h3>
              <button className="text-[#11248F] font-medium mb-1 hover:underline">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations and Social Links */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Head Office */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Head Office</h2>
            <div className="space-y-3">
              <p className="text-primary">
                345 Spear Street San Francisco, CA 94105
                <br />
                United States
              </p>
              <p className="text-primary">+1 415-736-0000</p>
              <a href="mailto:sanfrancisco@uix.store" className="text-[#11248F] hover:underline block">
                sanfrancisco@uix.store
              </a>
              <a href="mailto:info@uix.store" className="text-[#11248F] hover:underline block">
                info@uix.store
              </a>
            </div>
          </div>

          {/* Store */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Store</h2>
            <div className="space-y-3">
              <p className="text-primary">
                111 8th Avenue New York, NY 10011
                <br />
                United States
              </p>
              <p className="text-primary">+1 415-736-0000</p>
              <a href="mailto:newyork@uix.store" className="text-[#11248F] hover:underline block">
                newyork@uix.store
              </a>
              <a href="mailto:info@uix.store" className="text-[#11248F] hover:underline block">
                info@uix.store
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Connect</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-primary hover:text-[#11248F]">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-primary hover:text-[#11248F]">
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-primary hover:text-[#11248F]">
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-primary hover:text-[#11248F]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                <span>Pinterest</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-[#D4F1E8] py-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <p className="text-sm text-primary mb-2">Get in touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              We look forward to
              <br />
              hearing from you
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="What's Your Name?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white border-[#DADFE3]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="What's Your E-mail?"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white border-[#DADFE3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Subject
              </label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
                required
              >
                <SelectTrigger className="bg-white border-[#DADFE3]">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="sales">Sales Question</SelectItem>
                  <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Message
              </label>
              <Textarea
                placeholder="Can You Provide Some More Details?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-white border-[#DADFE3] resize-none"
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="privacy"
                checked={formData.agreeToPolicy}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeToPolicy: checked as boolean })
                }
              />
              <label htmlFor="privacy" className="text-sm text-primary cursor-pointer">
                You agree to our friendly{" "}
                <a href="#" className="text-[#11248F] hover:underline">
                  privacy policy
                </a>
                .
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1D2128] hover:bg-primary text-white h-12 text-base font-medium"
            >
              Get in Touch
            </Button>
          </form>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-[#7C818B] mb-2">Newsletter</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Get recommendations, tips,
            <br />
            updates and more
          </h2>

          <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="flex-1 border-[#DADFE3]"
            />
            <Button
              type="submit"
              className="bg-[#1D2128] hover:bg-primary text-white px-8"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-[#7C818B] mt-4">
            We care about your data in our{" "}
            <a href="#" className="text-[#11248F] hover:underline">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
