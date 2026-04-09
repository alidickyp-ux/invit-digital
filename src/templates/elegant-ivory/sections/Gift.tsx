"use client";

import { Invitation } from "@prisma/client";
import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic", "normal"] });

export default function Gift({ data }: { data: Invitation }) {
  const [copied, setCopied] = useState<string | null>(null);

  // Jika tidak ada data rekening, section ini tidak muncul
  if (!data.giftBank1 && !data.giftBank2) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-20 px-8 text-center bg-white/50">
      <div className="max-w-md mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className={`${cormorant.className} text-4xl text-[#3D3020]`}>Wedding Gift</h2>
          <p className="text-[11px] text-[#9E8A6E] leading-relaxed px-6 italic">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat memberi kado secara cashless.
          </p>
        </div>

        <div className="space-y-6">
          {/* Kartu Rekening 1 */}
          {data.giftBank1 && (
            <div className="p-8 border border-[#C9A96E]/20 bg-[#FDFBF7] rounded-sm shadow-sm space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <span className="text-4xl font-bold uppercase">{data.giftBank1}</span>
              </div>
              
              <p className="text-[10px] tracking-[4px] text-[#C9A96E] uppercase font-bold">{data.giftBank1}</p>
              
              <div className="space-y-1">
                <p className={`${cormorant.className} text-2xl text-[#3D3020] tracking-widest`}>
                  {data.giftAccNo1}
                </p>
                <p className="text-[11px] text-[#9E8A6E] uppercase tracking-tighter">
                  a.n {data.giftAccName1}
                </p>
              </div>

              <button 
                onClick={() => handleCopy(data.giftAccNo1!, "bank1")}
                className="mt-4 px-6 py-2 border border-[#C9A96E]/40 text-[9px] tracking-[2px] uppercase text-[#9E8A6E] hover:bg-[#C9A96E] hover:text-white transition-all duration-500"
              >
                {copied === "bank1" ? "Berhasil Disalin" : "Salin Nomor"}
              </button>
            </div>
          )}

          {/* Kartu Rekening 2 */}
          {data.giftBank2 && (
            <div className="p-8 border border-[#C9A96E]/20 bg-[#FDFBF7] rounded-sm shadow-sm space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <span className="text-4xl font-bold uppercase">{data.giftBank2}</span>
              </div>

              <p className="text-[10px] tracking-[4px] text-[#C9A96E] uppercase font-bold">{data.giftBank2}</p>
              
              <div className="space-y-1">
                <p className={`${cormorant.className} text-2xl text-[#3D3020] tracking-widest`}>
                  {data.giftAccNo2}
                </p>
                <p className="text-[11px] text-[#9E8A6E] uppercase tracking-tighter">
                  a.n {data.giftAccName2}
                </p>
              </div>

              <button 
                onClick={() => handleCopy(data.giftAccNo2!, "bank2")}
                className="mt-4 px-6 py-2 border border-[#C9A96E]/40 text-[9px] tracking-[2px] uppercase text-[#9E8A6E] hover:bg-[#C9A96E] hover:text-white transition-all duration-500"
              >
                {copied === "bank2" ? "Berhasil Disalin" : "Salin Nomor"}
              </button>
            </div>
          )}
        </div>

        {/* Alamat Kirim Kado (Opsional) */}
        <div className="pt-8">
           <div className="h-[0.5px] w-12 bg-[#C9A96E]/40 mx-auto mb-6" />
           <p className="text-[9px] tracking-[2px] text-[#9E8A6E] uppercase italic">
             Terima Kasih
           </p>
        </div>
      </div>
    </section>
  );
}