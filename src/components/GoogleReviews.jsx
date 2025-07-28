

import React, { useEffect, useRef } from 'react';

const GoogleReviews = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Check if the script is already injected
    if (!document.getElementById('trustindex-script')) {
      const script = document.createElement('script');
      script.id = 'trustindex-script';
      script.src = 'https://cdn.trustindex.io/loader.js?7076b4b50b90931c09564cfe4b3';
      script.async = true;
      script.defer = true;
      widgetRef.current?.appendChild(script);
    }
  }, []);

  return (
    <section className="relative z-10 py-16 px-4 sm:px-8 md:px-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-black text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>

      {/* Wrapper where Trustindex will inject the reviews */}
      <div ref={widgetRef}>
        <div className="ti-widget ti-widget-base mx-auto" style={{ maxWidth: '1200px' }}></div>
      </div>
    </section>
  );
};

export default GoogleReviews;
