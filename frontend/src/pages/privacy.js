import React, { useState } from 'react';
import './PrivacyPage.css'; // Import the CSS

function PrivacyPage() {
  const [activeSection, setActiveSection] = useState(null);
  const [message] = useState("Last Updated: June 2025");

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-subtitle">For Excel-Analytic Platform</p>
      
      <p className="privacy-description">
        Your privacy is important to us. This Privacy Policy explains how we collect, 
        use, disclose, and safeguard your information when you use our Excel-Analytic Platform.
      </p>

      <div className="terms-section">
        <h2 className="section-header" onClick={() => toggleSection('collection')}>
          1. Information We Collect
        </h2>
        {activeSection === 'collection' && (
          <div className="section-content">
            <p>We may collect:</p>
            <ul className="list">
              <li><strong>Account Information:</strong> Name, email address, contact details</li>
              <li><strong>Usage Data:</strong> Files you upload, operations you perform</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
              <li><strong>Payment Information:</strong> For premium services (processed by secure third-party providers)</li>
            </ul>
          </div>
        )}
      </div>

      <div className="terms-section">
        <h2 className="section-header" onClick={() => toggleSection('usage')}>
          2. How We Use Your Information
        </h2>
        {activeSection === 'usage' && (
          <div className="section-content">
            <ul className="list">
              <li>To provide and maintain our service</li>
              <li>To improve user experience</li>
              <li>To communicate with you</li>
              <li>For security and fraud prevention</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p>
              We <strong>never</strong> sell your personal data to third parties.
            </p>
          </div>
        )}
      </div>

      <div className="terms-section">
        <h2 className="section-header" onClick={() => toggleSection('sharing')}>
          3. Data Sharing & Disclosure
        </h2>
        {activeSection === 'sharing' && (
          <div className="section-content">
            <p>We may share information:</p>
            <ul className="list">
              <li>With service providers who assist in our operations</li>
              <li>For legal compliance or law enforcement requests</li>
              <li>During business transfers (mergers/acquisitions)</li>
            </ul>
            <p>
              Data processing agreements are in place with all third parties.
            </p>
          </div>
        )}
      </div>

      <div className="terms-section">
        <h2 className="section-header" onClick={() => toggleSection('security')}>
          4. Data Security
        </h2>
        {activeSection === 'security' && (
          <div className="section-content">
            <p>We implement:</p>
            <ul className="list">
              <li>Encryption of data in transit (SSL/TLS)</li>
              <li>Regular security audits</li>
              <li>Access controls</li>
              <li>Data minimization principles</li>
            </ul>
            <p>
              However, no electronic transmission or storage is 100% secure.
            </p>
          </div>
        )}
      </div>

      <div className="terms-section">
        <h2 className="section-header" onClick={() => toggleSection('rights')}>
          5. Your Rights
        </h2>
        {activeSection === 'rights' && (
          <div className="section-content">
            <p>You can:</p>
            <ul className="list">
              <li>Access your personal data</li>
              <li>Request corrections</li>
              <li>Request deletion (where applicable)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent</li>
            </ul>
            <p>
              Contact us at <a href="mailto:privacy@excelanalytic.com">privacy@excelanalytic.com</a> to exercise these rights.
            </p>
          </div>
        )}
      </div>

      <div className="terms-section">
        <h2 className="section-header" onClick={() => toggleSection('changes')}>
          6. Policy Changes
        </h2>
        {activeSection === 'changes' && (
          <div className="section-content">
            <p>
              We may update this policy periodically. We'll notify you of significant 
              changes via email or through our platform.
            </p>
          </div>
        )}
      </div>

      <div className="footer">
        {message && <p>{message}</p>}
        <p>
          For questions: <a href="mailto:privacy@excelanalytic.com">privacy@excelanalytic.com</a>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;