import { Invitation } from "@prisma/client";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic", "normal"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

export default function Hero({ data }: { data: Invitation }) {
  const formattedDate = new Date(data.eventDate).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section className={`${jost.className} relative flex flex-col items-center justify-center min-h-screen text-center px-10 py-24`}
      style={{ background: "#FDFBF7" }}>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

      {["top-6 left-6 border-t border-l","top-6 right-6 border-t border-r","bottom-6 left-6 border-b border-l","bottom-6 right-6 border-b border-r"].map((cls) => (
        <div key={cls} className={`absolute w-9 h-9 border-[#C9A96E]/50 ${cls}`} />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs">
        <div className="w-52 overflow-hidden shadow-xl"
          style={{ height: "260px", borderRadius: "104px 104px 0 0", border: "6px solid #fff", outline: "1px solid #D4B896", background: "#EDE6DA" }}>
          {data.heroImage
            ? <img src={data.heroImage} alt="" className="w-full h-full object-cover" />
            : <div className="flex items-center justify-center h-full"><span className="text-[10px] tracking-widest text-[#C9A96E] uppercase">Photo</span></div>}
        </div>
        <p className="text-[11px] tracking-[6px] text-[#9E8A6E] uppercase">The Wedding of</p>
        <h1 className={`${cormorant.className} text-[4.5rem] font-light text-[#1a1a1a] leading-none`}>{data.brideName}</h1>
        <span className={`${cormorant.className} text-4xl italic text-[#C9A96E]`}>&amp;</span>
        <h1 className={`${cormorant.className} text-[4.5rem] font-light text-[#1a1a1a] leading-none`}>{data.groomName}</h1>
        <div className="flex items-center gap-4 w-full justify-center mt-1">
          <div className="h-px flex-1 max-w-[60px] bg-[#C9A96E] opacity-35" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
          <div className="h-px flex-1 max-w-[60px] bg-[#C9A96E] opacity-35" />
        </div>
        <p className="text-[12px] tracking-[2px] text-[#9E8A6E]">{formattedDate}</p>
      </div>
    </section>
  );
}