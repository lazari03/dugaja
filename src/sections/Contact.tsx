import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { siteContent, serviceTypes } from '@/data/siteData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ContactFormData } from '@/types';

export function Contact() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      message: '',
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteContent.contact.email,
      href: `mailto:${siteContent.contact.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteContent.contact.phone,
      href: `tel:${siteContent.contact.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteContent.contact.location,
      href: '#',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: siteContent.contact.hours,
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="section-label justify-center flex"
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            Get In Touch
          </span>
          <h2
            className="mb-4"
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.1s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            Let's Create Something Beautiful
          </h2>
          <p
            className="text-black/60 max-w-md mx-auto"
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.2s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            Ready to book your session? Reach out and let's discuss your vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div
            className="lg:col-span-2 space-y-8"
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.3s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            {contactInfo.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-start gap-4"
                style={{
                  animation: isVisible
                    ? `fadeUp 0.6s var(--ease-expo-out) ${0.4 + index * 0.1}s forwards`
                    : 'none',
                  opacity: 0,
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 border border-black/10 group-hover:border-black group-hover:bg-black transition-all duration-300">
                  <item.icon
                    size={20}
                    className="text-black group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-black/60 mb-1">
                    {item.label}
                  </p>
                  <p className="text-black group-hover:text-black/70 transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div
              className="pt-8 border-t border-black/10"
              style={{
                animation: isVisible
                  ? 'fadeUp 0.6s var(--ease-expo-out) 0.8s forwards'
                  : 'none',
                opacity: 0,
              }}
            >
              <p className="text-xs font-bold tracking-wider uppercase text-black/60 mb-4">
                Follow Me
              </p>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'Twitter', 'Pinterest'].map((social) => (
                  <a
                    key={social}
                    href={siteContent.social[social.toLowerCase() as keyof typeof siteContent.social]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-black/10 text-black/60 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                    aria-label={social}
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-3"
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.4s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-black/10">
                <CheckCircle size={64} className="text-black mb-4" />
                <h3 className="font-serif text-2xl mb-2">Message Sent!</h3>
                <p className="text-black/60">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-0 transition-all duration-300 ${
                        focusedField === 'name' || formData.name
                          ? '-top-6 text-xs text-black/60'
                          : 'top-3 text-black/40'
                      }`}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-0 transition-all duration-300 ${
                        focusedField === 'email' || formData.email
                          ? '-top-6 text-xs text-black/60'
                          : 'top-3 text-black/40'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className={`absolute left-0 transition-all duration-300 ${
                        focusedField === 'phone' || formData.phone
                          ? '-top-6 text-xs text-black/60'
                          : 'top-3 text-black/40'
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-0 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors"
                    />
                  </div>

                  {/* Service Type */}
                  <div className="relative">
                    <label
                      htmlFor="serviceType"
                      className="block text-xs text-black/60 mb-2"
                    >
                      Service Interest
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'message' || formData.message
                        ? '-top-6 text-xs text-black/60'
                        : 'top-3 text-black/40'
                    }`}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send size={16} />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
