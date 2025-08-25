import React, { useState } from 'react';

function TermsPage() {
    const [activeSection, setActiveSection] = useState(null);
    const [message] = useState("");

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow space-y-4">
            <h1 className="text-3xl font-bold text-gray-700 text-center">Terms & Conditions</h1>
            <p className="text-gray-600 mt-2">
                Welcome to Excel-Analytic Platform. These Terms of Service ("Terms") govern your access to and use of our website, services, and platform (collectively, the "Service"). Please read these Terms carefully before using the Service.
            </p>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('acceptance')}>
                    Acceptance of Terms
                </h2>
                {activeSection === 'acceptance' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>
                            By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Service.
                        </p>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('serviceDescription')}>
                    Service Description
                </h2>
                {activeSection === 'serviceDescription' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>
                            Excel-Analytic Platform provides advanced analytics and data processing tools for Microsoft Excel files. Our service includes:
                        </p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Automated data cleaning and transformation</li>
                            <li>Advanced statistical analysis and forecasting</li>
                            <li>Customizable reporting and visualization</li>
                            <li>Cloud-based spreadsheet collaboration</li>
                            <li>API access for enterprise users</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('userResponsibilities')}>
                    User Responsibilities
                </h2>
                {activeSection === 'userResponsibilities' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>As a user of our Service, you agree to:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Provide accurate and complete information when creating your account</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Not use the Service for any unlawful purposes</li>
                            <li>Not upload or share content that infringes on intellectual property rights</li>
                            <li>Comply with all applicable laws and regulations</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('dataPrivacy')}>
                    Data Privacy and Security
                </h2>
                {activeSection === 'dataPrivacy' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>
                            We take data privacy and security seriously. Our Privacy Policy explains how we collect, use, and protect your information.
                        </p>
                        <p>When you upload Excel files to our platform:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>We do not claim ownership of your data</li>
                            <li>We implement industry-standard security measures to protect your data</li>
                            <li>We may process and store your data solely to provide the Service</li>
                            <li>You retain all rights to your data and can export it at any time</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('payments')}>
                    Payments and Subscriptions
                </h2>
                {activeSection === 'payments' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>Some features of our Service require payment. By subscribing to these features, you agree to:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Pay all applicable fees for the selected subscription plan</li>
                            <li>Provide valid payment information</li>
                            <li>Authorize recurring payments if you choose an auto-renewing subscription</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('intellectualProperty')}>
                    Intellectual Property
                </h2>
                {activeSection === 'intellectualProperty' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>
                            All intellectual property rights in the Service, including all software, trademarks, and content (excluding user data) are owned by Excel-Analytic Platform or our licensors.
                        </p>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('disclaimer')}>
                    Disclaimer and Limitation of Liability
                </h2>
                {activeSection === 'disclaimer' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>
                            The Service is provided "as is" without warranties of any kind, either express or implied. Excel-Analytic Platform does not guarantee that:
                        </p>
                        <ul className="list-disc list-inside mt-2">
                            <li>The Service will be uninterrupted or error-free</li>
                            <li>The results obtained from the Service will be accurate or reliable</li>
                            <li>The quality of any products, services, or information obtained through the Service will meet your expectations</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="terms-section">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleSection('modification')}>
                    Modifications to Terms
                </h2>
                {activeSection === 'modification' && (
                    <div className="mt-2 p-4 border border-gray-300 rounded">
                        <p>
                            We reserve the right to modify these Terms at any time. When we make changes, we will post the updated Terms on our website with a new effective date.
                        </p>
                    </div>
                )}
            </div>

            {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
        </div>
    );
}

export default TermsPage;