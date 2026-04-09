import { Invitation } from "@prisma/client";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["italic", "normal"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

export default function Couple({ data }: { data: Invitation }) {
  return (
    <section className={`${jost.className} flex flex-col items-center`} style={{ paddingTop: "80px", paddingBottom: "80px", paddingLeft: "40px", paddingRight: "40px" }}>

      {/* Header */}
      <div className="text-center mb-20 space-y-5 w-full">
        <p className="text-[11px] tracking-[6px] text-[#9E8A6E] uppercase">Mempelai</p>
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
          <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
        </div>
        <p className={`${cormorant.className} text-xl italic text-[#7a6a58] leading-relaxed`}>
          Maha Suci Allah yang telah menciptakan<br />makhluk-Nya berpasang-pasangan
        </p>
      </div>

      {/* Bride */}
      <div className="flex flex-col items-center text-center w-full" style={{ marginBottom: "16px" }}>
        <div style={{
          width: "168px", height: "224px", borderRadius: "84px",
          border: "1px solid rgba(201,169,110,0.45)", padding: "8px",
          background: "#fff", transform: "rotate(-2deg)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)", marginBottom: "32px",
          transition: "transform 0.7s ease",
        }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "76px", overflow: "hidden" }}>
            {data.bridePhoto
              ? <img src={data.bridePhoto} alt={data.brideName} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%)")} />
              : <div style={{ width: "100%", height: "100%", background: "#EDE6DA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem", color: "#C9A96E" }}>♀</span>
                </div>}
          </div>
        </div>

        <p className="text-[11px] tracking-[5px] text-[#9E8A6E] uppercase" style={{ marginBottom: "10px" }}>The Bride</p>
        <h3 className={`${cormorant.className} text-[3.2rem] font-light text-[#1a1a1a] leading-tight`}>{data.brideName}</h3>
        {data.brideParents && (
          <p className="text-[14px] text-[#9E8A6E] leading-relaxed" style={{ marginTop: "14px" }}>
            Putri dari<br />
            <span className="text-[#3D3020] font-medium">{data.brideParents}</span>
          </p>
        )}
      </div>

      {/* Ampersand */}
      <div className="flex flex-col items-center" style={{ paddingTop: "40px", paddingBottom: "40px", gap: "16px" }}>
        <div style={{ height: "60px", width: "1px", background: "#C9A96E", opacity: 0.2 }} />
        <span className={`${cormorant.className} text-[3.5rem] italic text-[#C9A96E]`}>&amp;</span>
        <div style={{ height: "60px", width: "1px", background: "#C9A96E", opacity: 0.2 }} />
      </div>

      {/* Groom */}
      <div className="flex flex-col items-center text-center w-full" style={{ marginTop: "16px" }}>
        <div style={{
          width: "168px", height: "224px", borderRadius: "84px",
          border: "1px solid rgba(201,169,110,0.45)", padding: "8px",
          background: "#fff", transform: "rotate(2deg)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)", marginBottom: "32px",
          transition: "transform 0.7s ease",
        }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "76px", overflow: "hidden" }}>
            {data.groomPhoto
              ? <img src={data.groomPhoto} alt={data.groomName} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%)")} />
              : <div style={{ width: "100%", height: "100%", background: "#EDE6DA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem", color: "#C9A96E" }}>♂</span>
                </div>}
          </div>
        </div>

        <p className="text-[11px] tracking-[5px] text-[#9E8A6E] uppercase" style={{ marginBottom: "10px" }}>The Groom</p>
        <h3 className={`${cormorant.className} text-[3.2rem] font-light text-[#1a1a1a] leading-tight`}>{data.groomName}</h3>
        {data.groomParents && (
          <p className="text-[14px] text-[#9E8A6E] leading-relaxed" style={{ marginTop: "14px" }}>
            Putra dari<br />
            <span className="text-[#3D3020] font-medium">{data.groomParents}</span>
          </p>
        )}
      </div>
    </section>
  );
}