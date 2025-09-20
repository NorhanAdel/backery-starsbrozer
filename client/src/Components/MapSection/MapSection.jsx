import React from "react";
import "./MapSection.scss";

function MapSection() {
  return (
    <section className="map-section">
      <div className="maps-container">
        <h2 className="title">موقعنا</h2>
        <div className="map-container">
          <iframe
            title="Bakery Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1578.2519048452818!2d31.13385172883606!3d30.198358499288716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDExJzU0LjQiTiAzMcKwMDgnMDEuOCJF!5e1!3m2!1sen!2seg!4v1757849587233!5m2!1sen!2seg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
