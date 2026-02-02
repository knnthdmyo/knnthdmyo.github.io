'use client';

import dayjs from 'dayjs';
import { useContact } from '@/viewmodels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faDownload, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ContactInfo } from '@/models';
import { useState } from 'react';

const CV_LINK = 'https://drive.google.com/uc?export=download&id=1BwI5OSUnxb8c8usowPTB-DQKRDB79RC8';

// Email template
const createEmailTemplate = () => {
  const subject = encodeURIComponent('👋 Hello! - Opportunity Inquiry');
  const body = encodeURIComponent(`Hi Kenneth,

I came across your portfolio at https://knnthdmyo.com/ and I'm impressed with your work!

I'd love to discuss [briefly mention your reason - e.g., "a potential collaboration", "an opportunity at our company", "a project idea"].

Looking forward to connecting!

Best regards,
[Your Name]
[Your Company/Role (optional)]
[Your Contact Information (optional)]`);
  
  return { subject, body };
};

const ReachOut = () => {
  const { contactInfo, socialNetworks, email } = useContact();
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const handleContactClick = async (contact: ContactInfo) => {
    switch (contact.type) {
      case 'email':
        // Open email client with template
        const { subject, body } = createEmailTemplate();
        window.location.href = `mailto:${contact.value}?subject=${subject}&body=${body}`;
        break;
      
      case 'phone':
        // Try to open phone app (works on mobile)
        // Remove spaces for tel: link
        const phoneNumber = contact.value.replace(/\s/g, '');
        const telLink = `tel:${phoneNumber}`;
        const canOpenPhone = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (canOpenPhone) {
          window.location.href = telLink;
        } else {
          // On desktop, copy to clipboard
          try {
            await navigator.clipboard.writeText(contact.value);
            setShowCopiedToast(true);
            setTimeout(() => setShowCopiedToast(false), 3000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        }
        break;
      
      case 'location':
        // Open Google Maps with coordinates
        if (contact.coordinates) {
          const [lng, lat] = contact.coordinates;
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
          window.open(mapsUrl, '_blank');
        }
        break;
    }
  };

  return (
    <div className="box-border flex flex-col relative">
      {/* Copied to Clipboard Toast */}
      <div
        className={`fixed top-24 right-8 z-[9999] flex items-center gap-3 px-6 py-3 rounded-full bg-sky-500/90 dark:bg-sky-500/80 backdrop-blur-xl text-white shadow-lg shadow-sky-500/30 border border-sky-400/20 transition-all duration-300 ${
          showCopiedToast ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <FontAwesomeIcon icon={faCheck} className="text-sm" />
        <span className="text-sm font-medium">Number copied to clipboard!</span>
      </div>

      <div className="md:py-20 py-12 flex flex-col gap-10 md:gap-14">
        {/* Header */}
        <div className="page-header">
          <span className="page-subtitle">Get In Touch</span>
          <h1 className="page-title">Let&apos;s Connect</h1>
          <div className="page-title-divider">
            <div className="page-divider-line" />
            <p className="page-divider-text">Open for opportunities</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="px-8 md:px-20 flex flex-col gap-4">
          {contactInfo.map((contact, index) => (
            <button
              key={index}
              onClick={() => handleContactClick(contact)}
              className="contact-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FontAwesomeIcon 
                icon={contact.icon} 
                className="contact-icon" 
              />
              <span className="contact-value">
                {contact.value}
              </span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="px-8 md:px-20 flex flex-wrap gap-4">
          <a
            href={`mailto:${email}?subject=${createEmailTemplate().subject}&body=${createEmailTemplate().body}`}
            className="btn-primary opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: '300ms' }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>Say Hello!</span>
          </a>
          <a
            href={CV_LINK}
            download="Kenneth_Resume.pdf"
            className="btn-secondary opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: '400ms' }}
          >
            <FontAwesomeIcon icon={faDownload} />
            <span>Download CV</span>
          </a>
        </div>

        {/* Social Networks */}
        <div className="px-8 md:px-20">
          <p className="text-[10px] uppercase tracking-widest text-black/60 dark:text-gray-400 mb-4">Follow Me</p>
          <div className="flex gap-4">
            {socialNetworks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="btn-icon"
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200/20 dark:border-gray-700/20 py-8 px-8 md:px-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs text-black/60 dark:text-gray-400">
            © {dayjs().year()} knnthdmyo • Built with React, TypeScript & too much coffee
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-[9px] text-black/40 dark:text-gray-400/50">
            <span>500k+ lines of code</span>
            <span>•</span>
            <span>∞ bugs squashed</span>
            <span>•</span>
            <span>9999+ cups of coffee</span>
            <span>•</span>
            <span>42% will to live</span>
            <span>•</span>
            <span>∞ stackoverflow visits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;
