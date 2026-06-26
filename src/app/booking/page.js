"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ROOMS } from "@/data/rooms";
import { useLanguage } from "@/context/LanguageContext";

function BookingWizardContent() {
  const searchParams = useSearchParams();
  const { lang, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // cash | bank | mobile
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [summary, setSummary] = useState({
    roomName: "-",
    price: 0,
    nights: 1,
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  // URL pre-selected room & branch check
  useEffect(() => {
    const roomParam = searchParams.get("room");
    const locParam = searchParams.get("location");
    
    if (locParam && ["lahore", "islamabad", "karachi", "murree"].includes(locParam)) {
      setSelectedLocation(locParam);
    }
    
    if (roomParam) {
      const room = ROOMS.find((r) => r.id === roomParam && r.available);
      if (room) {
        setSelectedRoomId(room.id);
        setSelectedLocation(room.location);
      }
    }
  }, [searchParams]);

  // Recalculate summary details when items change
  useEffect(() => {
    if (!selectedRoomId) return;

    const room = ROOMS.find((r) => r.id === selectedRoomId);
    if (!room) return;

    let nightsCount = 1;
    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      if (!isNaN(checkinDate.getTime()) && !isNaN(checkoutDate.getTime()) && checkoutDate > checkinDate) {
        const diffTime = Math.abs(checkoutDate - checkinDate);
        nightsCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
    }

    const subtotal = room.price * nightsCount;
    const tax = Math.round(subtotal * 0.13); // 13% tax
    const total = subtotal + tax;

    setSummary({
      roomName: lang === "ur" && room.id === "standard" ? "اسٹینڈرڈ کمرہ" :
                lang === "ur" && room.id === "deluxe" ? "ڈیلکس سوئٹ" :
                lang === "ur" && room.id === "family" ? "فیملی سوئٹ" :
                lang === "ur" && room.id === "executive" ? "ایگزیکٹو بزنس روم" :
                lang === "ur" && room.id === "penthouse" ? "پینٹ ہاؤس سوئٹ" :
                lang === "ur" && room.id === "murree_chalet" ? "پائن ویو مری شیلیٹ" :
                lang === "ur" && room.id === "karachi_villa" ? "سمندر کنارے ولا" :
                lang === "ur" && room.id === "islamabad_suite" ? "مارگلہ ایگزیکٹو سوئٹ" : room.name,
      price: room.price,
      nights: nightsCount,
      subtotal,
      tax,
      total,
    });
  }, [selectedRoomId, checkin, checkout, lang]);

  const validateStep = () => {
    if (currentStep === 0) {
      if (!selectedRoomId) {
        alert(lang === "ur" ? "پلیز رہائش کے لیے کمرہ منتخب کریں۔" : "Please select a room category to proceed.");
        return false;
      }
      return true;
    }

    if (currentStep === 1) {
      if (!checkin || !checkout || !guests) {
        alert(lang === "ur" ? "پلیز آمد و رخصت کی تاریخیں اور مہمان درج کریں۔" : "Please fill in all booking parameters.");
        return false;
      }

      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkinDate < today) {
        alert(lang === "ur" ? "آمد کی تاریخ ماضی میں نہیں ہو سکتی۔" : "Check-in date cannot be in the past.");
        return false;
      }

      if (checkoutDate <= checkinDate) {
        alert(lang === "ur" ? "رخصتی کی تاریخ آمد کی تاریخ کے بعد ہونی چاہیے۔" : "Check-out date must be after the check-in date.");
        return false;
      }
      return true;
    }

    if (currentStep === 2) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        alert(lang === "ur" ? "پلیز نام، ای میل اور موبائل نمبر درج کریں۔" : "Please provide your name, email address, and phone number.");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert(lang === "ur" ? "پلیز درست ای میل ایڈریس درج کریں۔" : "Please enter a valid email address.");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3); // success screen
    }, 1500);
  };

  return (
    <div className="booking-wizard-container" id="bookingWizard">
      {/* Step Indicators Header */}
      {currentStep < 3 && (
        <div className="wizard-progress">
          <div className={`progress-step ${currentStep === 0 ? "active" : ""} ${currentStep > 0 ? "completed" : ""}`}>
            <span className="progress-step-num">{currentStep > 0 ? <i className="fas fa-check"></i> : "1"}</span>
            <span>{t("bookingStep1")}</span>
          </div>
          <div className={`progress-step ${currentStep === 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
            <span className="progress-step-num">{currentStep > 1 ? <i className="fas fa-check"></i> : "2"}</span>
            <span>{t("bookingStep2")}</span>
          </div>
          <div className={`progress-step ${currentStep === 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
            <span className="progress-step-num">3</span>
            <span>{t("bookingStep3")}</span>
          </div>
          <div className="progress-step">
            <span className="progress-step-num">4</span>
            <span>{t("bookingStep4")}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* STEP 1: ROOM SELECTION */}
        {currentStep === 0 && (
          <div className="wizard-step-panel active">
            <h2 className="step-title">{t("wizardTitle1")}</h2>
            <p className="step-subtitle">{t("wizardDesc1")}</p>

            {/* Branch Filter dropdown */}
            <div className="form-group" style={{ marginBottom: "28px", maxWidth: "420px" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", display: "block", color: "var(--text)" }}>
                {lang === "ur" ? "شہر / برانچ منتخب کریں:" : "Select Branch City:"}
              </label>
              <select 
                value={selectedLocation} 
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setSelectedRoomId(""); // reset selected room when branch changes
                }} 
                className="form-control-select"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                  fontFamily: "inherit",
                  fontSize: "0.95rem"
                }}
              >
                <option value="all">{lang === "ur" ? "تمام شہر / برانچز" : "All Cities & Branches"}</option>
                <option value="lahore">{lang === "ur" ? "لاہور برانچ (گلبرگ)" : "Lahore Branch (Gulberg)"}</option>
                <option value="islamabad">{lang === "ur" ? "اسلام آباد برانچ (ایف سیون)" : "Islamabad Branch (F-7)"}</option>
                <option value="karachi">{lang === "ur" ? "کراچی برانچ (کلفٹن)" : "Karachi Branch (Clifton)"}</option>
                <option value="murree">{lang === "ur" ? "مری برانچ (مال روڈ)" : "Murree Branch (Mall Road)"}</option>
              </select>
            </div>

            <div className="room-select-grid">
              {ROOMS.filter(r => selectedLocation === "all" || r.location === selectedLocation).map((room) => (
                <div
                  key={room.id}
                  className={`room-select-card ${selectedRoomId === room.id ? "selected" : ""} ${
                    !room.available ? "disabled" : ""
                  }`}
                  onClick={() => room.available && setSelectedRoomId(room.id)}
                  style={{ opacity: room.available ? 1 : 0.5, cursor: room.available ? "pointer" : "not-allowed" }}
                >
                  <input
                    type="radio"
                    name="selectedRoom"
                    checked={selectedRoomId === room.id}
                    onChange={() => {}}
                    disabled={!room.available}
                  />
                  <div className="room-select-info">
                    <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: "600", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      <i className="fas fa-map-marker-alt"></i> {room.location}
                    </span>
                    <h4>
                      {lang === "ur" && room.id === "standard" ? "اسٹینڈرڈ کمرہ" :
                       lang === "ur" && room.id === "deluxe" ? "ڈیلکس سوئٹ" :
                       lang === "ur" && room.id === "family" ? "فیملی سوئٹ" :
                       lang === "ur" && room.id === "executive" ? "ایگزیکٹو بزنس روم" :
                       lang === "ur" && room.id === "penthouse" ? "پینٹ ہاؤس سوئٹ" :
                       lang === "ur" && room.id === "murree_chalet" ? "پائن ویو مری شیلیٹ" :
                       lang === "ur" && room.id === "karachi_villa" ? "سمندر کنارے ولا" :
                       lang === "ur" && room.id === "islamabad_suite" ? "مارگلہ ایگزیکٹو سوئٹ" : room.name} 
                      {!room.available && (lang === "ur" ? " (دستیاب نہیں)" : " (Fully Booked)")}
                    </h4>
                    <p>
                      {lang === "ur" ? (
                        room.id === "standard" ? "1 سنگل بیڈ | اے سی اور وائی فائی" :
                        room.id === "deluxe" ? "1 ڈبل بیڈ | اٹیچڈ باتھ | منی فریج" :
                        room.id === "family" ? "2 ڈبل بیڈز | اٹیچڈ لاؤنج | فیملی فرینڈلی" :
                        room.id === "executive" ? "1 کنگ بیڈ | ورک ڈیسک | وائی فائی" :
                        room.id === "penthouse" ? "نجی جکوزی | ہوم تھیٹر | بٹلر سروس" :
                        room.id === "murree_chalet" ? "فائر پلیس | ہیٹنگ | پائن ویو" :
                        room.id === "karachi_villa" ? "نجی پول | سمندر کنارے ولا | چوبیس گھنٹے بجلی" :
                        "مارگلہ ویو | ورک اسٹیشن | سونا تک رسائی"
                      ) : room.features.slice(0, 3).join(" | ")}
                    </p>
                    <div className="room-select-price">
                      {room.currency} {room.price.toLocaleString()} / {room.per === "night" ? (lang === "ur" ? "رات" : "night") : room.per}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DATES */}
        {currentStep === 1 && (
          <div className="wizard-step-panel active">
            <h2 className="step-title">{t("wizardTitle2")}</h2>
            <p className="step-subtitle">{t("wizardDesc2")}</p>
            <div className="form-grid">
              <div className="form-group">
                <label>{t("labelCheckin")}</label>
                <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t("labelCheckout")}</label>
                <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} required />
              </div>
              <div className="form-group full-width">
                <label>{t("labelGuests")}</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} required>
                  <option value="" disabled>
                    {t("selectGuests")}
                  </option>
                  <option value="1">{lang === "ur" ? "1 مہمان" : "1 Guest"}</option>
                  <option value="2">{lang === "ur" ? "2 مہمان" : "2 Guests"}</option>
                  <option value="3">{lang === "ur" ? "3 مہمان" : "3 Guests"}</option>
                  <option value="4">{lang === "ur" ? "4 مہمان" : "4 Guests"}</option>
                  <option value="5+">{lang === "ur" ? "5+ مہمان (فیملی سوئٹ)" : "5+ Guests (Requires Family Suite)"}</option>
                </select>
              </div>
            </div>

            {/* Calculations Card */}
            <div className="summary-card">
              <h3 className="summary-title">{t("calcTitle")}</h3>
              <div className="summary-row">
                <span>{t("summarySelected")}</span>
                <span>{summary.roomName}</span>
              </div>
              <div className="summary-row">
                <span>{t("summaryRate")}</span>
                <span>PKR {summary.price.toLocaleString()} / {lang === "ur" ? "رات" : "night"}</span>
              </div>
              <div className="summary-row">
                <span>{t("summaryDuration")}</span>
                <span>{summary.nights} {lang === "ur" ? "رات قیام" : "Night(s)"}</span>
              </div>
              <div className="summary-row">
                <span>{t("summarySubtotal")}</span>
                <span>PKR {summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>{t("summaryTax")}</span>
                <span>PKR {summary.tax.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>{t("summaryTotal")}</span>
                <span>PKR {summary.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DETAILS & LOCAL PAKISTANI PAYMENTS */}
        {currentStep === 2 && (
          <div className="wizard-step-panel active">
            <h2 className="step-title">{t("wizardTitle3")}</h2>
            <p className="step-subtitle">{t("wizardDesc3")}</p>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>{t("labelFullName")}</label>
                <input
                  type="text"
                  placeholder={t("placeholderName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t("labelEmail")}</label>
                <input
                  type="email"
                  placeholder="e.g. name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t("labelPhone")}</label>
                <input
                  type="tel"
                  placeholder="e.g. +92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Pakistani Payment Methods Selection */}
              <div className="form-group full-width">
                <label>{lang === "ur" ? "طریقہ ادائیگی *" : "Payment Method *"}</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                  <option value="cash">{lang === "ur" ? "آمد پر کیش ادائیگی (Cash on Arrival)" : "Cash on Arrival"}</option>
                  <option value="mobile">{lang === "ur" ? "ایزی پیسہ / جاز کیش (Easypaisa / JazzCash)" : "Easypaisa / JazzCash Transfer"}</option>
                  <option value="bank">{lang === "ur" ? "براہ راست بینک ٹرانسفر (Bank Transfer)" : "Direct Bank Transfer"}</option>
                </select>

                {/* Local Payment Instructions */}
                {paymentMethod === "mobile" && (
                  <div style={{ marginTop: "12px", padding: "16px", background: "var(--accent-light)", borderRadius: "8px", fontSize: "0.88rem", border: "1px solid var(--accent)", color: "var(--text)" }}>
                    <i className="fas fa-info-circle" style={{ marginRight: "6px" }}></i>
                    {lang === "ur" ? (
                      <span>ہمارے ایزی پیسہ نمبر <strong>0300-0000000</strong> پر فیس منتقل کریں اور سکرین شاٹ واٹس ایپ پر شیئر کریں۔</span>
                    ) : (
                      <span>Send payment to Easypaisa/JazzCash account <strong>0300-0000000</strong> and share screenshot on WhatsApp.</span>
                    )}
                  </div>
                )}
                {paymentMethod === "bank" && (
                  <div style={{ marginTop: "12px", padding: "16px", background: "var(--accent-light)", borderRadius: "8px", fontSize: "0.88rem", border: "1px solid var(--accent)", color: "var(--text)" }}>
                    <i className="fas fa-university" style={{ marginRight: "6px" }}></i>
                    {lang === "ur" ? (
                      <span><strong>الائیڈ بینک (ABL):</strong> اکاؤنٹ نمبر: 123456789، برانچ کوڈ: 0123، ٹائٹل: Comfort Inn</span>
                    ) : (
                      <span><strong>Allied Bank (ABL):</strong> Account: 123456789, Branch Code: 0123, Title: Comfort Inn</span>
                    )}
                  </div>
                )}
              </div>

              <div className="form-group full-width">
                <label>{t("labelRequests")}</label>
                <textarea
                  rows="3"
                  placeholder={t("placeholderRequests")}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION SUCCESS */}
        {currentStep === 3 && (
          <div className="wizard-step-panel active">
            <div className="booking-success-box">
              <div className="booking-success-icon">
                <i className="fas fa-check"></i>
              </div>
              <h2>{t("wizardTitle4")}</h2>
              <p>{t("wizardDesc4")}</p>
              <p style={{ marginTop: "12px", color: "var(--accent-hover)", fontWeight: "600", fontSize: "1.1rem" }}>
                {lang === "ur" ? "بکنگ آئی ڈی: #CI-84792" : "Booking ID: #CI-84792"}
              </p>
              <a href="/" className="btn btn-primary" style={{ marginTop: "24px" }}>
                {t("btnReturn")}
              </a>
            </div>
          </div>
        )}

        {/* Wizard buttons */}
        {currentStep < 3 && (
          <div className="wizard-footer">
            <button
              type="button"
              className="btn btn-outline prev-step"
              onClick={handleBack}
              style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
            >
              <i className="fas fa-arrow-left"></i> {t("btnBack")}
            </button>
            {currentStep < 2 ? (
              <button type="button" className="btn btn-primary next-step" onClick={handleNext}>
                {t("btnContinue")} <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button type="submit" className="btn btn-primary submit-booking" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> {lang === "ur" ? "پراسیسنگ..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i> {t("btnRequest")}
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default function BookingPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('/images/hotel_lobby.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("bookingTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("bookingLabel")}</span>
          </div>
        </div>
      </header>

      {/* Booking Wizard container */}
      <section className="py-section">
        <div className="container">
          <Suspense fallback={<div className="text-center py-10">Loading Booking Wizard...</div>}>
            <BookingWizardContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}
