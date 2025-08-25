// src/pages/TwoFactorSetup.jsx
import { useEffect, useState } from "react";
import {api} from "../utils/api";

const TwoFactorSetup = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const res = await api.get("/auth/2fa/setup", {
          headers: { Authorization: 'Bearer ${localStorage.getItem("token")}' },
        });
        setQrCodeUrl(res.data.qrCodeUrl);
        setSecret(res.data.secret);
      } catch (err) {
        console.error("Error generating 2FA secret:", err);
      }
    };
    fetchSecret();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow space-y-4 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold">Set Up 2FA</h2>
        <p className="text-sm text-gray-600">Scan this QR code in your authenticator app:</p>
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="2FA QR Code" className="mx-auto" />
        ) : (
          <p>Loading QR Code...</p>
        )}
        <p className="text-sm text-gray-500">Or enter manually: <strong>{secret}</strong></p>
      </div>
    </div>
  );
};

export default TwoFactorSetup;