import React from 'react';
import { FaUsers, FaRegClipboard, FaLock } from 'react-icons/fa';

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="grid-cols-1 p-6 rounded-2xl transition-all">
    <div className="text-3xl text-amber-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

function WhyChoose() {
  return (
    <div className="app bg-gray-50 py-12">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Why To Choose Mind Haven?
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Data Analytics */}
          <div className="data-analytics">
            <div className="py-8 px-4 text-center">
              <img 
                src="/img/whychoose.png"
                alt="Analytics"
                className="mx-auto mb-6 w-3/4 text-center rounded-2xl"
              />
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Daily Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">
                We always provide useful information to make it easier for you every day.
              </p>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="feature-cards grid gap-6">
            <FeatureCard
              icon={<FaUsers />}
              title="Personalized Support"
              description="Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit."
            />
            <FeatureCard
              icon={<FaRegClipboard />}
              title="Expert-Curated Resources"
              description="Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit."
            />
            <FeatureCard
              icon={<FaLock />}
              title="Confidential and Secure"
              description="Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;
