import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: "Welcome to Excel Analytics",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard",
      logout: "Logout",
      // Add more keys here...
    }
  },
  hi: {
    translation: {
      welcome: "एक्सेल एनालिटिक्स में आपका स्वागत है",
      login: "लॉग इन करें",
      signup: "साइन अप करें",
      dashboard: "डैशबोर्ड",
      logout: "लॉग आउट",
    }
  },
  mr: {
    translation: {
      welcome: "एक्सेल अ‍ॅनालिटिक्स मध्ये स्वागत आहे",
      login: "लॉगिन करा",
      signup: "साइन अप करा",
      dashboard: "डॅशबोर्ड",
      logout: "लॉगआउट",
    }
  }
};

i18n
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;