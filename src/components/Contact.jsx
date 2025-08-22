import { useEffect, useRef, useState } from 'react';
import './Contact.css';

export default function Contact() {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      type: 'email',
      label: 'Email',
      value: 'suhasjavali05@gmail.com',
      icon: '/contact/gmail.png',
      link: 'mailto:suhasjavali05@gmail.com',
      description: 'Send me an email',
      isImage: true
    },
    // {
    //   type: 'phone',
    //   label: 'Phone',
    //   value: '+91 974-123-4567',
    //   icon: '📱',
    //   link: 'tel:+919741234567',
    //   description: 'Call me directly'
    // },
    // {
    //   type: 'location',
    //   label: 'Location',
    //   value: 'Mysuru, Karnataka, India',
    //   icon: '📍',
    //   link: 'https://maps.google.com/?q=Mysuru,Karnataka,India',
    //   description: 'Based in Mysuru',
    //   isImage: false
    // },
    {
      type: 'linkedin',
      label: 'LinkedIn',
    //   value: 'www.linkedin.com/in/suhasjavali',
      icon: '/contact/linkedin.webp',
      link: 'https://www.linkedin.com/in/suhas-javali-652853354/',
      description: 'Connect professionally',
      isImage: true
    },
    {
      type: 'github',
      label: 'GitHub',
    //   value: 'github.com/suhasjavali',
      icon: '/contact/github.png',
      link: 'https://github.com/suhasjavali',
      description: 'View my projects',
      isImage: true
    },
    // {
    //   type: 'portfolio',
    //   label: 'Portfolio',
    //   value: 'suhasjavali.dev',
    //   icon: '🌐',
    //   link: 'https://suhasjavali.dev',
    //   description: 'Visit my website'
    // }
  ];

  const handleContactClick = async (contact) => {
    if (!contact) {
      return;
    }

    // For email card: only copy email, do not navigate
    if (contact.type === 'email') {
      if (contact.value) {
        try {
          await navigator.clipboard.writeText(contact.value);
          setSubmitStatus({ type: 'info', message: 'Email copied to clipboard.' });
        // eslint-disable-next-line no-unused-vars
        } catch (_) {
          setSubmitStatus({ type: 'info', message: 'Email: ' + contact.value });
        }
      }
      return;
    }

    // For other contact types, follow original behavior
    if (!contact.link) {
      return;
    }

    const link = contact.link;
    const isTel = link.startsWith('tel:');

    try {
      if (isTel) {
        window.location.href = link;
      } else {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      // Fallback
      window.location.href = link;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email' });
      return false;
    }
    if (!formData.email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your message' });
      return false;
    }
    if (formData.message.trim().length < 10) {
      setSubmitStatus({ type: 'error', message: 'Message must be at least 10 characters long' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create mailto link with form data
      const subject = `Portfolio Contact from ${formData.email.split('@')[0]}`;
      const body = `Email: ${formData.email}\n\nMessage:\n${formData.message}`;
      
      // Try multiple email service options with icons
      const emailOptions = [
        {
          name: 'Gmail',
          icon: '/contact/gmail.png',
          url: `https://mail.google.com/mail/?view=cm&fs=1&to=suhasjavali05@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        },
        {
          name: 'Outlook',
          icon: '/contact/outlook.jpeg', // Using LinkedIn icon as placeholder for Outlook
          url: `https://outlook.live.com/mail/0/deeplink/compose?to=suhasjavali@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        },
        // {
        //   name: 'Yahoo Mail',
        //   icon: '/contact/github.png', // Using GitHub icon as placeholder for Yahoo
        //   url: `https://compose.mail.yahoo.com/?to=suhasjavali@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        // }   
        // {
        //   name: 'Default Email',
        //   icon: '/contact/gmail.png', // Using Gmail icon for default email
        //   url: `mailto:suhasjavali@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        // }
      ];

      // Show email service selection
      setSubmitStatus({ 
        type: 'info', 
        message: 'Choose your email service:',
        emailOptions: emailOptions
      });
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to process form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailServiceSelect = (emailUrl) => {
    window.open(emailUrl, '_blank');
    setSubmitStatus({ 
      type: 'success', 
      message: 'Email service opened! Please send the email to complete your message.' 
    });
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="contact__container">
        <h2 className="contact__heading">
          Get In Touch
          <span className="heading-accent">.</span>
        </h2>
        
        <p className="contact__subtitle">
          I'm always open to discussing new opportunities, interesting projects, 
          or just having a chat about technology and development.
        </p>

        <div className="contact__content">
          <div className="contact__info">
            {contactInfo.map((contact, index) => (
              <div 
                key={contact.type}
                className="contact-item"
                style={{ '--delay': `${index * 0.1}s` }}
                onClick={() => handleContactClick(contact)}
              >
                <div className="contact-icon">
                  {contact.isImage ? (
                    <img 
                      src={contact.icon} 
                      alt={contact.label}
                      className="contact-icon-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : (
                    <span className="icon-emoji">{contact.icon}</span>
                  )}
                </div>
                <div className="contact-details">
                  <h3 className="contact-label">{contact.label}</h3>
                  <p className="contact-value">{contact.value}</p>  
                  <p className="contact-description">{contact.description}</p>
                </div>
                <div className="contact-glow" aria-hidden="true"></div>
              </div>
            ))}
          </div>

                     <div className="contact__form-section">
             <div className="contact__form-card">
               <h3 className="form-title">Send me a message</h3>
               {/* <p className="form-subtitle">
                 Have a project in mind? Let's discuss how I can help bring your ideas to life.
               </p> */}
               
               <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-field">
                     <label htmlFor="email" className="field-label">Email:</label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       className="form-input"
                       placeholder="your.email@example.com"
                       required
                     />
                   </div>
                 
                 <div className="form-field">
                   <label htmlFor="message" className="field-label">Message:</label>
                   <textarea
                     id="message"
                     name="message"
                     value={formData.message}
                     onChange={handleInputChange}
                     className="form-textarea"
                     placeholder="Description..."
                     rows="4"
                     required
                   ></textarea>
                 </div>
                 
                 {submitStatus && (
                   <div className={`form-status ${submitStatus.type}`}>
                     <span className="status-icon">
                       {submitStatus.type === 'success' ? '✓' : 
                        submitStatus.type === 'error' ? '✗' : 'ℹ'}
                     </span>
                     <span className="status-message">{submitStatus.message}</span>
                     
                     {submitStatus.emailOptions && (
                       <div className="email-options">
                         <div className="email-options-header">
                           {/* <span className="email-options-title">Choose your email service:</span> */}
                         </div>
                         <div className="email-options-grid">
                           {submitStatus.emailOptions.map((option, index) => (
                             <button
                               key={index}
                               className="email-option-btn"
                               type="button"
                               onClick={() => handleEmailServiceSelect(option.url)}
                             >
                               <img src={option.icon} alt={option.name} className="email-option-icon" />
                               <span className="email-option-name">{option.name}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
                 
                 <div className="form-cta">
                   {/* <span className="cta-text">Ready to collaborate?</span> */}
                   <button 
                     type="submit" 
                     className="cta-button"
                     disabled={isSubmitting}
                   >
                     {isSubmitting ? 'Opening Email...' : 'Send Message'}
                   </button>
                 </div>
               </form>
             </div>
           </div>
        </div>

        <div className="contact__footer">
          <p className="footer-text">
            Let's build something amazing together
          </p>
          <div className="availability-status">
            <span className="status-dot"></span>
            <span className="status-text">Open to exciting opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
}