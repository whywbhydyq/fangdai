// Vercel Speed Insights Integration
// This script initializes Vercel Speed Insights for tracking web vitals and performance metrics

(function() {
  'use strict';
  
  // Initialize the Speed Insights queue
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }
  
  // Inject the Speed Insights script
  function injectSpeedInsights() {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Use the Vercel-hosted script path (will be available after deploying to Vercel)
    var scriptSrc = '/_vercel/speed-insights/script.js';
    
    // Check if script is already injected
    if (document.head.querySelector('script[src*="' + scriptSrc + '"]')) {
      return;
    }
    
    // Create and configure the script element
    var script = document.createElement('script');
    script.src = scriptSrc;
    script.defer = true;
    script.dataset.sdkn = '@vercel/speed-insights';
    script.dataset.sdkv = '1.3.1';
    
    // Error handling
    script.onerror = function() {
      console.log('[Vercel Speed Insights] Failed to load script from ' + scriptSrc + '. Please ensure Speed Insights is enabled in your Vercel project dashboard.');
    };
    
    // Inject the script
    document.head.appendChild(script);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSpeedInsights);
  } else {
    injectSpeedInsights();
  }
})();
