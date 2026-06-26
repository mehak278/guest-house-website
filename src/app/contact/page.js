"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert(lang === "ur" ? "پلیز تمام فیلڈز مکمل کریں۔" : "Please fill in all required fields.");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1200);
  };

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('images/hotel_lobby.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("contactTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navContact")}</span>
          </div>
        </div>
      </header>

      {/* Contact Layout */}
      <section className="py-section">
        <div className="container">
          <div className="contact-layout">
            
            {/* Contact details */}
            <div className="contact-info-block">
              <span className="section-label">{t("contactLabel")}</span>
              <h2 className="section-title">{t("contactTitleMain")}</h2>
              <p>{t("contactDesc")}</p>

              <div className="contact-info-list">
                
                {/* WhatsApp */}
                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Phone & WhatsApp</h4>
                    <p>{t("footerPhone")}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Email Address</h4>
                    <p>{t("footerEmail")}</p>
                  </div>
                </div>

                {/* Map marker */}
                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Physical Location</h4>
                    <p>{t("footerAddress")}</p>
                  </div>
                </div>

                {/* Clock */}
                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="far fa-clock"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Check-in / Check-out</h4>
                    <p dangerouslySetInnerHTML={{ __html: t("footerTimings") }}></p>
                  </div>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="contact-form-block">
              <h3>{t("formTitle")}</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>{t("formName")}</label>
                  <input
                    type="text"
                    placeholder={t("formPlaceholderName")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t("formEmail")}</label>
                  <input
                    type="email"
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t("formSubject")}</label>
                  <input
                    type="text"
                    placeholder={t("formPlaceholderSubject")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t("formMsg")}</label>
                  <textarea
                    rows="4"
                    placeholder={t("formPlaceholderMsg")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    backgroundColor: status === "success" ? "var(--success)" : "",
                    borderColor: status === "success" ? "var(--success)" : "",
                  }}
                  disabled={status === "sending"}
                >
                  {status === "idle" && (
                    <>
                      {t("btnSendMsg")} <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> {t("btnSending")}
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <i className="fas fa-check"></i> {t("btnSentSuccess")}
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="contact-map-sec">
        <div className="container">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108841.22336336336!2d74.22336336336336!3d31.520370000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901b0e259e863%3A0xa6ebbb30c6fb0e0a!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1782471900000!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Comfort Inn Google Map Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
