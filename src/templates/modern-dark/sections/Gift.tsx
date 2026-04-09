"use client";

import { useState } from "react";
import { Playfair_Display, Jost } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"], style: ["italic"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

// Logo bank — filter invert agar tampil putih di dark bg
const BANK_LOGOS: Record<string, string> = {
  BCA:       "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
  BRI:       "https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg",
  BNI:       "https://upload.wikimedia.org/wikipedia/commons/4/44/BNI_logo.svg",
  MANDIRI:   "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
  BSI:       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Logo_Bank_Syariah_Indonesia.svg/320px-Logo_Bank_Syariah_Indonesia.svg.png",
  CIMB:      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/CIMB_Niaga.svg/320px-CIMB_Niaga.svg.png",
  DANA:      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/320px-Logo_dana_blue.svg.png",
  OVO:       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/320px-Logo_ovo_purple.svg.png",
  GOPAY:     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/320px-Gopay_logo.svg.png",
  SHOPEEPAY: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/ShopeePay_Logo.svg/320px-ShopeePay_Logo.svg.png",
  BTN:       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Logo_Bank_BTN.svg/320px-Logo_Bank_BTN.svg.png",
  PERMATA:   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bank_Permata_logo.svg/320px-Bank_Permata_logo.svg.png",
};

function getLogo(bank: string): string {
  const key = bank?.toUpperCase().replace(/\s+/g, "").replace("BANK", "").trim();
  return BANK_LOGOS[key] || "";
}

interface BankCardProps {
  bank: string;
  accountNumber: string;
  accountName: string;
}

function BankCard({ bank, accountNumber, accountName }: BankCardProps) {
  const [copied, setCopied] = useState(false);
  const logo = getLogo(bank);

  const copy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div style={{
      background: "#141720",
      border: "1px solid rgba(184,149,42,0.18)",
      borderRadius: "4px",
      padding: "36px 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top gold line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%",
        height: "2px",
        background: "linear-gradient(to right, transparent, #B8952A, transparent)",
      }} />

      {/* Chip dekoratif pojok kanan atas */}
      <div style={{
        position: "absolute", top: "20px", right: "22px",
        width: "40px", height: "30px",
        background: "linear-gradient(135deg, #B8952A, #E8C96A, #B8952A)",
        borderRadius: "5px", opacity: 0.8,
      }} />

      {/* Row: Logo + nama bank */}
      <div style={{ marginBottom: "24px", minHeight: "28px", display: "flex", alignItems: "center" }}>
        {logo ? (
          <>
            <img
              src={logo}
              alt={bank}
              style={{
                height: "24px", maxWidth: "96px",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
                opacity: 0.92,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                (e.currentTarget.nextSibling as HTMLElement).style.display = "block";
              }}
            />
            <span
              className={`${jost.className} text-white`}
              style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "3px", display: "none" }}
            >
              {bank}
            </span>
          </>
        ) : (
          <span className={`${jost.className} text-white`} style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "3px" }}>
            {bank}
          </span>
        )}
      </div>

      {/* Nomor rekening */}
      <p
        className={`${jost.className} text-white`}
        style={{ fontSize: "1.35rem", letterSpacing: "5px", fontWeight: 300, marginBottom: "10px" }}
      >
        {accountNumber}
      </p>

      {/* Nama pemilik */}
      <p
        className={`${jost.className} text-[#8A8D9E]`}
        style={{ fontSize: "12px", marginBottom: "28px", letterSpacing: "1px" }}
      >
        a.n. {accountName}
      </p>

      {/* Tombol salin */}
      <button
        onClick={copy}
        style={{
          padding: "10px 28px",
          fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase",
          background: copied ? "#B8952A" : "transparent",
          color: copied ? "#0F0F0F" : "#B8952A",
          border: "1px solid #B8952A",
          cursor: "pointer", transition: "all 0.3s",
          fontFamily: "inherit", fontWeight: 500, borderRadius: "2px",
        }}
      >
        {copied ? "Tersalin ✓" : "Salin Rekening"}
      </button>
    </div>
  );
}

export default function Gift({ data }: { data: any }) {
  // Support dua format: field lama (giftBank1) dan field baru (giftAccounts JSON)
  const accounts: { bank: string; accountNumber: string; accountName: string }[] = [];

  if (data.giftAccounts && Array.isArray(data.giftAccounts)) {
    accounts.push(...data.giftAccounts);
  } else {
    if (data.giftBank1 && data.giftAccNo1) {
      accounts.push({ bank: data.giftBank1, accountNumber: data.giftAccNo1, accountName: data.giftAccName1 || "" });
    }
    if (data.giftBank2 && data.giftAccNo2) {
      accounts.push({ bank: data.giftBank2, accountNumber: data.giftAccNo2, accountName: data.giftAccName2 || "" });
    }
  }

  if (accounts.length === 0 && !data.giftAddress) return null;

  return (
    <section style={{ background: "#0A0C12", padding: "96px 40px" }}>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "72px" }}>
        <p
          className={`${jost.className} uppercase text-[#B8952A]`}
          style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "22px" }}
        >
          Wedding Gift
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "22px" }}>
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
          <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
        </div>
        <p
          className={`${playfair.className} italic text-[#5A5D6E] leading-relaxed`}
          style={{ fontSize: "1.05rem" }}
        >
          Doa restu Anda adalah kado terindah bagi kami. Namun bagi yang ingin memberi tanda kasih...
        </p>
      </div>

      {/* ── Bank cards ── */}
      {accounts.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: data.giftAddress ? "48px" : "0" }}>
          {accounts.map((acc, i) => (
            <BankCard key={i} bank={acc.bank} accountNumber={acc.accountNumber} accountName={acc.accountName} />
          ))}
        </div>
      )}

      {/* ── Alamat kado ── */}
      {data.giftAddress && (
        <div style={{
          background: "#141720",
          border: "1px solid rgba(184,149,42,0.18)",
          padding: "36px 32px",
          marginTop: accounts.length > 0 ? "20px" : "0",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%",
            height: "2px",
            background: "linear-gradient(to right, transparent, #B8952A, transparent)",
          }} />
          <p
            className={`${jost.className} uppercase text-[#B8952A]`}
            style={{ fontSize: "9px", letterSpacing: "5px", marginBottom: "18px" }}
          >
            Alamat Kirim Kado
          </p>
          {data.giftRecipient && (
            <p className={`${jost.className} text-white`} style={{ fontSize: "14px", marginBottom: "6px" }}>
              {data.giftRecipient}
            </p>
          )}
          {data.giftPhone && (
            <p className={`${jost.className} text-[#5A5D6E]`} style={{ fontSize: "12px", marginBottom: "10px" }}>
              {data.giftPhone}
            </p>
          )}
          <p className={`${jost.className} text-[#8A8D9E] leading-relaxed`} style={{ fontSize: "13px" }}>
            {data.giftAddress}
          </p>
        </div>
      )}
    </section>
  );
}