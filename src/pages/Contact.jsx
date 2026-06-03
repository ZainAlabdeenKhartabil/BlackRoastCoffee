import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const Contact = () => {
  const { showNotification } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    showNotification(`Message received! Thank you, ${formData.name}. We'll respond shortly.`);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Roastery & Lounge",
      details: ["404 Obsidian Way", "Coffee Town"]
    },
    {
      icon: Phone,
      title: "Telephonic Line",
      details: ["+40 (791) 555-ROAST", "Mon - Fri, 9am - 5pm EST"]
    },
    {
      icon: Mail,
      title: "Direct Correspondence",
      details: ["vault@blackroastcoffee.com", "press@blackroastcoffee.com"]
    },
    {
      icon: Clock,
      title: "Lounge Hours",
      details: ["Mon - Sat: 8:00 AM - 7:00 PM", "Sunday: 9:00 AM - 5:00 PM"]
    }
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-container animate-fade-in">
          <h1 className="contact-hero-title">Contact Lounge</h1>
          <p className="contact-hero-desc">Visit our roasting facility or reach out to our concierge.</p>
        </div>
      </section>

      <section className="section contact-main-section">
        <div className="container contact-grid">
          <div className="contact-info-column animate-fade-in">
            <h2 className="contact-column-title">The Roastery Lounge</h2>
            <p className="contact-column-desc">
              Whether you are looking to wholesale our beans, inquire about micro-lot roast cycles, or simply discuss the finer details of extraction, we welcome your message.
            </p>

            <div className="contact-info-cards">
              {contactInfo.map((info, idx) => {
                const IconComp = info.icon;
                return (
                  <div key={idx} className="contact-info-card">
                    <div className="card-icon-wrapper">
                      <IconComp size={20} className="gold-text" />
                    </div>
                    <div className="card-text">
                      <h4 className="card-title">{info.title}</h4>
                      {info.details.map((line, lIdx) => (
                        <p key={lIdx} className="card-detail-line">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contact-form-column animate-fade-in">
            <div className="contact-form-wrapper">
              <h3 className="form-title">Send a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="john@coffeelover.com"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="contact-subject">Inquiry Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Wholesale Roast Inquiries"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Write your thoughts..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" variant="primary" className="btn-submit-form">
                  <span>Send Message</span>
                  <Send size={14} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-placeholder-section bg-secondary">
        <div className="container">
          <div className="map-mock-container">
            <div className="map-mock-overlay">
              <MapPin size={36} className="gold-text animate-float" style={{ animation: 'float 3s infinite ease-in-out' }} />
              <h3>Roastery Lounge</h3>
              <p>404 Obsidian Way, Coffee town</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <Button variant="gold-outline">Get Directions</Button>
              </a>
            </div>
            <div className="map-bg-grid"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
