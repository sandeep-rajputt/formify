"use client";

import { useState } from "react";
import SimpleCard from "@/component/common/SimpleCard";
import { useSendContactMessageMutation } from "@/lib/api/features/contactApi";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [sendContactMessage, { isLoading: isSubmitting }] =
    useSendContactMessageMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    try {
      await sendContactMessage(formData).unwrap();
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-light-fg-muted to-light-fg dark:from-dark-fg-muted dark:to-dark-fg leading-tight">
          Get in Touch
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-light-fg-muted dark:text-dark-fg-muted">
          Have a question or feedback? We&apos;d love to hear from you. Send us
          a message and we&apos;ll respond as soon as possible.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <SimpleCard className="p-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-light-fg dark:text-dark-fg">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                ✓ Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                ✗ Failed to send message. Please try again or contact us
                directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-light-fg dark:text-dark-fg"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-fg/10 dark:border-dark-fg/10 text-light-fg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-light-fg dark:text-dark-fg"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-fg/10 dark:border-dark-fg/10 text-light-fg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 text-light-fg dark:text-dark-fg"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-fg/10 dark:border-dark-fg/10 text-light-fg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-light-fg dark:text-dark-fg"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-fg/10 dark:border-dark-fg/10 text-light-fg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-full text-base font-semibold bg-brand-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </SimpleCard>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <SimpleCard className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h3 className="font-semibold text-light-fg dark:text-dark-fg mb-1">
                  Email
                </h3>
                <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                  support@formify.com
                </p>
              </div>
            </div>
          </SimpleCard>

          <SimpleCard className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="font-semibold text-light-fg dark:text-dark-fg mb-1">
                  Live Chat
                </h3>
                <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                  Available Mon-Fri, 9am-5pm EST
                </p>
              </div>
            </div>
          </SimpleCard>

          <SimpleCard className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h3 className="font-semibold text-light-fg dark:text-dark-fg mb-1">
                  Office
                </h3>
                <p className="text-sm text-light-fg-muted dark:text-dark-fg-muted">
                  123 Form Street
                  <br />
                  San Francisco, CA 94102
                </p>
              </div>
            </div>
          </SimpleCard>

          <SimpleCard className="p-6">
            <h3 className="font-semibold text-light-fg dark:text-dark-fg mb-3">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                aria-label="Twitter"
              >
                <span className="text-xl">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xl">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                aria-label="GitHub"
              >
                <span className="text-xl">⚙</span>
              </a>
            </div>
          </SimpleCard>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12 text-light-fg dark:text-dark-fg">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <SimpleCard className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-light-fg dark:text-dark-fg">
              How quickly will I receive a response?
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              We typically respond to all inquiries within 24 hours during
              business days. For urgent matters, please use our live chat
              feature.
            </p>
          </SimpleCard>

          <SimpleCard className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-light-fg dark:text-dark-fg">
              Do you offer phone support?
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              Phone support is available for Enterprise plan customers. Please
              contact your account manager for direct access.
            </p>
          </SimpleCard>

          <SimpleCard className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-light-fg dark:text-dark-fg">
              Where can I find documentation?
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              Our comprehensive documentation is available in the Help Center.
              You can also access tutorials and guides from your dashboard.
            </p>
          </SimpleCard>
        </div>
      </section>
    </div>
  );
}
