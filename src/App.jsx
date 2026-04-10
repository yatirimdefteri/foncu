import { useState, useEffect, useCallback, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const C = {
  bg:       "#0e1015",
  bgCard:   "#16191f",
  bgHov:    "#1c2030",
  bgInput:  "#12141a",
  border:   "rgba(255,255,255,0.08)",
  borderHov:"rgba(255,255,255,0.18)",
  blue:     "#3b82f6",
  purple:   "#a855f7",
  pink:     "#ec4899",
  mint:     "#34d399",
  mintBg:   "rgba(52,211,153,0.1)",
  mintBorder:"rgba(52,211,153,0.25)",
  green:    "#22c55e",
  red:      "#ef4444",
  gold:     "#f0c060",
  text:     "#e8eaf0",
  textMid:  "#8892a4",
  textDim:  "#4a5568",
  grad:     "linear-gradient(90deg,#a855f7,#ec4899)",
  gradBlue: "linear-gradient(90deg,#3b82f6,#a855f7)",
};

const F = {
  serif: "'Cabinet Grotesk', system-ui, sans-serif",
  sans:  "'DM Sans', system-ui, sans-serif",
};

const G = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:${C.bg};color:${C.text};font-family:${F.sans};-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:${C.bg};}::-webkit-scrollbar-thumb{background:#2a2d3a;border-radius:3px;}

.nav-link{color:${C.textMid};text-decoration:none;font-size:13px;font-weight:400;letter-spacing:0.02em;padding-bottom:3px;border-bottom:1.5px solid transparent;transition:all 0.2s;cursor:pointer;}
.nav-link:hover{color:${C.text};}
.nav-link.active{color:${C.text};border-bottom-color:${C.purple};}

.card{background:${C.bgCard};border:1px solid ${C.border};border-radius:14px;}
.card-hover{background:${C.bgCard};border:1px solid ${C.border};border-radius:14px;transition:border-color 0.2s,background 0.2s,transform 0.2s;}
.card-hover:hover{border-color:rgba(168,85,247,0.3);background:${C.bgHov};transform:translateX(4px);}

.btn-primary{background:linear-gradient(135deg,#3b82f6,#a855f7);color:#fff;border:none;padding:10px 22px;border-radius:9px;font-family:${F.sans};font-size:13px;font-weight:500;cursor:pointer;transition:opacity 0.2s;}
.btn-primary:hover{opacity:0.85;}
.btn-ghost{background:transparent;color:${C.textMid};border:1px solid ${C.border};padding:9px 18px;border-radius:9px;font-family:${F.sans};font-size:13px;cursor:pointer;transition:all 0.2s;}
.btn-ghost:hover{border-color:${C.borderHov};color:${C.text};}
.btn-ghost.active{border-color:${C.purple};color:${C.purple};background:rgba(168,85,247,0.08);}

.badge{display:inline-flex;align-items:center;font-size:11px;font-weight:500;padding:3px 10px;border-radius:20px;letter-spacing:0.02em;}
.badge-blue{background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.15);}
.badge-purple{background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.15);}
.badge-mint{background:rgba(52,211,153,0.1);color:#34d399;border:1px solid rgba(52,211,153,0.2);}
.badge-pos{background:rgba(34,197,94,0.1);color:#4ade80;border:1px solid rgba(34,197,94,0.15);font-size:12px;font-weight:600;padding:3px 9px;border-radius:6px;}
.badge-neg{background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.15);font-size:12px;font-weight:600;padding:3px 9px;border-radius:6px;}
.badge-neu{background:rgba(148,163,184,0.08);color:${C.textMid};font-size:12px;font-weight:500;padding:3px 9px;border-radius:6px;}

.input-dark{width:100%;padding:11px 16px 11px 40px;border:1px solid ${C.border};border-radius:10px;font-family:${F.sans};font-size:13px;background:${C.bgInput};color:${C.text};outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
.input-dark:focus{border-color:${C.purple};box-shadow:0 0 0 3px rgba(168,85,247,0.1);}
.input-dark::placeholder{color:${C.textDim};}

.select-dark{padding:9px 32px 9px 12px;border:1px solid ${C.border};border-radius:9px;font-family:${F.sans};font-size:13px;background:${C.bgInput};color:${C.text};outline:none;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%238892a4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;transition:border-color 0.2s;}
.select-dark:focus{border-color:${C.purple};}
.select-dark option{background:#1c1f2e;}

.tab{padding:7px 14px;border-radius:8px;font-size:12px;color:${C.textMid};cursor:pointer;transition:all 0.2s;border:none;background:none;font-family:${F.sans};}
.tab:hover{color:${C.text};}
.tab.active{background:rgba(168,85,247,0.15);color:${C.purple};font-weight:500;}

@keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.fade-up{animation:fadeUp 0.3s ease forwards;}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
.skeleton{background:linear-gradient(90deg,#16191f 25%,#1e2235 50%,#16191f 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:10px;}

.grad-text{background:linear-gradient(90deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.grad-text-blue{background:linear-gradient(90deg,#3b82f6,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
`;

// ─── MOCK DATA ────────────────────────────────────────────────────
const FUNDS = [
  { kod:"AFT", ad:"Ak Portföy Teknoloji Yab. Hisse Fonu", tur:"Hisse Senedi", risk:6, fiyat:15.432, gun:1.24, ay:4.87, yil:28.43, buyukluk:2840, favori:false, katilim:false, yonetici:"Ak Portföy", kurulus:"2018", yatirimci:12400 },
  { kod:"GAF", ad:"Garanti Portföy Altın Fonu", tur:"Altın", risk:4, fiyat:8.871, gun:-0.31, ay:2.14, yil:31.22, buyukluk:5120, favori:false, katilim:false, yonetici:"Garanti Portföy", kurulus:"2015", yatirimci:28900 },
  { kod:"YAF", ad:"Yapı Kredi Portföy Yab. BYF", tur:"Karma", risk:5, fiyat:3.212, gun:0.68, ay:1.92, yil:18.56, buyukluk:1230, favori:true, katilim:false, yonetici:"YKP", kurulus:"2016", yatirimci:8700 },
  { kod:"TI2", ad:"İş Portföy BIST 30 Endeks Fonu", tur:"Endeks", risk:5, fiyat:12.788, gun:0.95, ay:3.42, yil:22.17, buyukluk:8750, favori:false, katilim:false, yonetici:"İş Portföy", kurulus:"2013", yatirimci:54200 },
  { kod:"IGS", ad:"İş Portföy Kısa Vadeli Bono Fonu", tur:"Borçlanma", risk:2, fiyat:2.564, gun:0.12, ay:0.98, yil:11.84, buyukluk:12400, favori:false, katilim:false, yonetici:"İş Portföy", kurulus:"2011", yatirimci:67300 },
  { kod:"AKP", ad:"Ak Portföy Para Piyasası Fonu", tur:"Para Piyasası", risk:1, fiyat:1.891, gun:0.08, ay:0.81, yil:9.92, buyukluk:34200, favori:false, katilim:false, yonetici:"Ak Portföy", kurulus:"2010", yatirimci:145000 },
  { kod:"TTE", ad:"Tera Portföy Teknoloji Girişim Fonu", tur:"Serbest", risk:7, fiyat:47.123, gun:2.31, ay:9.14, yil:54.88, buyukluk:890, favori:true, katilim:false, yonetici:"Tera Portföy", kurulus:"2020", yatirimci:4200 },
  { kod:"KGF", ad:"Kare Portföy Katılım Fonu", tur:"Katılım Hisse", risk:5, fiyat:9.234, gun:0.88, ay:3.12, yil:24.45, buyukluk:2100, favori:false, katilim:true, yonetici:"Kare Portföy", kurulus:"2017", yatirimci:11200 },
  { kod:"ZKF", ad:"Ziraat Portföy Katılım Endeks Fonu", tur:"Katılım Endeks", risk:4, fiyat:4.567, gun:0.54, ay:2.44, yil:19.88, buyukluk:3800, favori:false, katilim:true, yonetici:"Ziraat Portföy", kurulus:"2016", yatirimci:22100 },
  { kod:"IKF", ad:"İş Portföy Katılım Para Piyasası", tur:"Katılım Para", risk:1, fiyat:2.112, gun:0.09, ay:0.76, yil:9.44, buyukluk:8900, favori:false, katilim:true, yonetici:"İş Portföy", kurulus:"2014", yatirimci:41000 },
  { kod:"QNB", ad:"QNB Finans Portföy Hisse Fonu", tur:"Hisse Senedi", risk:6, fiyat:9.334, gun:0.77, ay:3.88, yil:25.63, buyukluk:1580, favori:false, katilim:false, yonetici:"QNB Finans", kurulus:"2019", yatirimci:7800 },
  { kod:"GHF", ad:"Gedik Portföy Hisse Senedi Fonu", tur:"Hisse Senedi", risk:7, fiyat:33.678, gun:1.62, ay:7.44, yil:47.29, buyukluk:540, favori:false, katilim:false, yonetici:"Gedik Portföy", kurulus:"2019", yatirimci:3100 },
  { kod:"DPF", ad:"Deniz Portföy Denge Fonu", tur:"Karma", risk:3, fiyat:4.221, gun:0.32, ay:1.44, yil:14.22, buyukluk:2100, favori:false, katilim:false, yonetici:"Deniz Portföy", kurulus:"2015", yatirimci:9400 },
  { kod:"HKF", ad:"Halk Portföy Katılım Hisse Fonu", tur:"Katılım Hisse", risk:6, fiyat:7.891, gun:1.02, ay:4.22, yil:27.33, buyukluk:1650, favori:false, katilim:true, yonetici:"Halk Portföy", kurulus:"2018", yatirimci:8900 },
];

const FUND_TYPES = ["Tümü","Hisse Senedi","Altın","Karma","Endeks","Borçlanma","Para Piyasası","Serbest","Katılım Hisse","Katılım Endeks","Katılım Para"];
const SORTS = [
  {v:"buyukluk_desc",l:"Büyüklük ↓"},{v:"yil_desc",l:"Yıllık Getiri ↓"},
  {v:"yil_asc",l:"Yıllık Getiri ↑"},{v:"gun_desc",l:"Günlük ↓"},
  {v:"risk_asc",l:"Risk ↑"},{v:"risk_desc",l:"Risk ↓"},
];

function genHistory(basePrice, days, trend) {
  const data = [];
  let p = basePrice * (1 - trend * days / 365);
  for (let i = 0; i < days; i++) {
    p = p * (1 + (trend / 365) + (Math.random() - 0.49) * 0.015);
    const d = new Date(); d.setDate(d.getDate() - (days - i));
    data.push({ tarih: `${d.getDate()}/${d.getMonth()+1}`, fiyat: +p.toFixed(4) });
  }
  return data;
}

function scoreCalc(f) {
  return Math.round(
    Math.min(f.yil / 60 * 40, 40) +
    (8 - f.risk) / 7 * 20 +
    Math.min(f.buyukluk / 35000 * 20, 20) +
    Math.min(f.yatirimci / 150000 * 20, 20)
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────
function ReturnBadge({ v }) {
  if (v > 0) return <span className="badge-pos">+{v.toFixed(2)}%</span>;
  if (v < 0) return <span className="badge-neg">{v.toFixed(2)}%</span>;
  return <span className="badge-neu">{v.toFixed(2)}%</span>;
}

function RiskDots({ level }) {
  const color = level <= 2 ? C.green : level <= 4 ? C.gold : level <= 5 ? "#fb923c" : C.red;
  return (
    <div style={{ display:"flex", gap:3, alignItems:"center" }}>
      {[1,2,3,4,5,6,7].map(i => (
        <div key={i} style={{ width:7, height:7, borderRadius:2, background: i<=level ? color : "rgba(255,255,255,0.08)" }}/>
      ))}
      <span style={{ fontSize:11, color:C.textDim, marginLeft:4 }}>{level}/7</span>
    </div>
  );
}

function ScoreRing({ score }) {
  const color = score >= 65 ? C.purple : score >= 45 ? C.blue : C.textDim;
  const r = 28, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" style={{ flexShrink:0 }}>
      <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
      <circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 38 38)"/>
      <text x="38" y="43" textAnchor="middle" fill={color}
        fontSize="20" fontWeight="800" fontFamily="Cabinet Grotesk, sans-serif">{score}</text>
      <text x="38" y="56" textAnchor="middle" fill="#4a5568"
        fontSize="8" letterSpacing="1">SKOR</text>
    </svg>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1e2235", border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 14px" }}>
      <div style={{ fontSize:11, color:C.textMid, marginBottom:3 }}>{label}</div>
      <div style={{ fontSize:14, fontWeight:600, color:C.purple }}>₺{payload[0]?.value?.toFixed(4)}</div>
    </div>
  );
};

function FundTypeBadge({ tur, katilim }) {
  if (katilim) return <span className="badge badge-mint">⬡ {tur}</span>;
  if (tur.includes("Hisse")) return <span className="badge badge-blue">{tur}</span>;
  if (tur.includes("Altın")) return <span className="badge" style={{ background:"rgba(240,192,96,0.1)", color:C.gold, border:"1px solid rgba(240,192,96,0.2)" }}>{tur}</span>;
  if (tur.includes("Borç") || tur.includes("Para")) return <span className="badge badge-purple">{tur}</span>;
  return <span className="badge badge-blue">{tur}</span>;
}

// ─── FUND ROW ─────────────────────────────────────────────────────
function FundRow({ f, onClick, onFav }) {
  return (
    <div className="card-hover" style={{ padding:"16px 22px", cursor:"pointer" }} onClick={() => onClick(f)}>
      <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>

        {/* Sol: kod + isim */}
        <div style={{ minWidth:220, flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
            <span style={{ fontFamily:F.serif, fontSize:22, fontWeight:700, color:C.text, letterSpacing:"-0.01em" }}>{f.kod}</span>
            <FundTypeBadge tur={f.tur} katilim={f.katilim} />
            {f.katilim && (
              <span style={{ fontSize:10, fontWeight:600, color:C.mint, background:C.mintBg, border:`1px solid ${C.mintBorder}`, padding:"2px 8px", borderRadius:20, letterSpacing:"0.04em" }}>☽ KATıLıM</span>
            )}
          </div>
          <p style={{ fontSize:12, color:C.textMid, lineHeight:1.45, maxWidth:300 }}>{f.ad}</p>
        </div>

        {/* Sağ: istatistikler */}
        <div style={{ display:"flex", gap:24, alignItems:"center", flexWrap:"wrap" }}>
          {[
            { l:"FİYAT", v:<span style={{ fontSize:14, fontWeight:500 }}>₺{f.fiyat.toFixed(3)}</span> },
            { l:"GÜNLÜK", v:<ReturnBadge v={f.gun}/> },
            { l:"AYLIK", v:<ReturnBadge v={f.ay}/> },
            { l:"YILLIK", v:<ReturnBadge v={f.yil}/> },
            { l:"RİSK", v:<RiskDots level={f.risk}/> },
          ].map(item => (
            <div key={item.l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, color:C.textDim, marginBottom:5, letterSpacing:"0.06em" }}>{item.l}</div>
              {item.v}
            </div>
          ))}
          <ScoreRing score={scoreCalc(f)} />
          <button
            onClick={e=>{e.stopPropagation();onFav(f.kod);}}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:f.favori?"#f0c060":C.textDim, transition:"all 0.2s", lineHeight:1, padding:"4px" }}
          >★</button>
        </div>
      </div>
    </div>
  );
}

// ─── FUND DETAIL ──────────────────────────────────────────────────
function FundDetail({ f, onBack, onFav }) {
  const [period, setPeriod] = useState("1A");
  const [simAmount, setSimAmount] = useState(10000);
  const periods = { "1H":7, "1A":30, "3A":90, "6A":180, "1Y":365 };
  const history = useMemo(() => genHistory(f.fiyat, periods[period], f.yil/100), [f.kod, period]);
  const score = scoreCalc(f);
  const scoreColor = score >= 65 ? C.purple : score >= 45 ? C.blue : C.textDim;
  const returnColor = f.gun >= 0 ? C.green : C.red;
  const simReturn = simAmount * (f.yil / 100);
  const portfolio = f.katilim
    ? [{ad:"Katılım Hisseleri",oran:55,color:C.mint},{ad:"Kira Sertifikası",oran:25,color:C.purple},{ad:"Altın",oran:12,color:C.gold},{ad:"Nakit",oran:8,color:C.textDim}]
    : [{ad:"Hisse Senedi",oran:45,color:C.blue},{ad:"Devlet Tahvili",oran:28,color:C.purple},{ad:"Nakit & Repo",oran:17,color:C.mint},{ad:"Diğer",oran:10,color:C.textDim}];

  return (
    <div className="fade-up">
      <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:C.textMid, fontSize:13, display:"flex", alignItems:"center", gap:6, marginBottom:28, fontFamily:F.sans }}>
        ← Fon Listesine Dön
      </button>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <h1 style={{ fontFamily:F.serif, fontSize:48, fontWeight:800, color:C.text, lineHeight:1 }}>{f.kod}</h1>
            <FundTypeBadge tur={f.tur} katilim={f.katilim} />
            {f.katilim && <span style={{ fontSize:11, fontWeight:600, color:C.mint, background:C.mintBg, border:`1px solid ${C.mintBorder}`, padding:"3px 10px", borderRadius:20 }}>☽ KATıLıM</span>}
          </div>
          <p style={{ color:C.textMid, fontSize:15, marginBottom:4 }}>{f.ad}</p>
          <p style={{ color:C.textDim, fontSize:12 }}>{f.yonetici} · Kuruluş {f.kurulus} · {f.yatirimci.toLocaleString()} yatırımcı</p>
        </div>
        <button onClick={()=>onFav(f.kod)} className="btn-ghost" style={{ color:f.favori?"#f0c060":undefined, borderColor:f.favori?"#f0c060":undefined }}>
          {f.favori ? "★ Favoriden Çıkar" : "☆ Favoriye Ekle"}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:20 }}>
        {[
          { l:"Güncel Fiyat", v:`₺${f.fiyat.toFixed(3)}` },
          { l:"Günlük", v:`${f.gun>0?"+":""}${f.gun.toFixed(2)}%`, vc:f.gun>=0?C.green:C.red },
          { l:"Aylık", v:`${f.ay>0?"+":""}${f.ay.toFixed(2)}%`, vc:f.ay>=0?C.green:C.red },
          { l:"Yıllık", v:`${f.yil>0?"+":""}${f.yil.toFixed(2)}%`, vc:f.yil>=0?C.green:C.red },
          { l:"Büyüklük", v:`₺${f.buyukluk}M` },
          { l:"Risk", v:`${f.risk}/7`, sub:f.risk<=2?"Düşük":f.risk<=4?"Orta":"Yüksek" },
        ].map(s => (
          <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 18px" }}>
            <div style={{ fontSize:11, color:C.textMid, marginBottom:6, letterSpacing:"0.04em" }}>{s.l}</div>
            <div style={{ fontSize:20, fontWeight:700, color:s.vc||C.text, fontFamily:F.serif }}>{s.v}</div>
            {s.sub && <div style={{ fontSize:11, color:C.textDim, marginTop:2 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Chart + Score */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:16, marginBottom:16 }}>
        <div className="card" style={{ padding:22 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <span style={{ fontSize:13, color:C.textMid, fontWeight:500 }}>Fiyat Grafiği</span>
            <div style={{ display:"flex", gap:3 }}>
              {Object.keys(periods).map(p => (
                <button key={p} className={`tab${period===p?" active":""}`} onClick={()=>setPeriod(p)}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={history} margin={{ top:5, right:5, bottom:0, left:0 }}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={returnColor} stopOpacity={0.18}/>
                  <stop offset="95%" stopColor={returnColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="tarih" tick={{ fontSize:10, fill:C.textDim }} tickLine={false} axisLine={false} interval="preserveStartEnd"/>
              <YAxis tick={{ fontSize:10, fill:C.textDim }} tickLine={false} axisLine={false} width={55} tickFormatter={v=>`₺${v.toFixed(2)}`} domain={['auto','auto']}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Area type="monotone" dataKey="fiyat" stroke={returnColor} strokeWidth={2.5} fill="url(#ag)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Score */}
        <div className="card" style={{ padding:22, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20 }}>
          <span style={{ fontSize:13, color:C.textMid, fontWeight:500, alignSelf:"flex-start" }}>Fon Puanı</span>
          <div style={{ position:"relative", width:120, height:120, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <svg width="120" height="120" style={{ position:"absolute", top:0, left:0, transform:"rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="7"
                strokeDasharray={`${(score/100)*314} 314`} strokeLinecap="round"
                style={{ filter:`drop-shadow(0 0 10px ${scoreColor})` }}/>
            </svg>
            <span style={{ fontSize:32, fontWeight:800, color:scoreColor, fontFamily:F.serif, lineHeight:1 }}>{score}</span>
            <span style={{ fontSize:10, color:C.textDim, marginTop:4, letterSpacing:"0.06em" }}>/ 100</span>
          </div>
          <div style={{ fontSize:14, fontWeight:600, color:scoreColor }}>
            {score>=75?"Mükemmel":score>=60?"İyi":score>=45?"Orta":"Düşük"}
          </div>
          <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { l:"Getiri", v:Math.min(Math.round(f.yil/60*40),40), max:40, c:C.green },
              { l:"Risk Dengesi", v:Math.round((8-f.risk)/7*20), max:20, c:C.blue },
              { l:"Büyüklük", v:Math.min(Math.round(f.buyukluk/35000*20),20), max:20, c:C.purple },
              { l:"Yatırımcı", v:Math.min(Math.round(f.yatirimci/150000*20),20), max:20, c:C.mint },
            ].map(item => (
              <div key={item.l}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.textDim, marginBottom:3 }}>
                  <span>{item.l}</span><span>{item.v}/{item.max}</span>
                </div>
                <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:2 }}>
                  <div style={{ height:"100%", width:`${(item.v/item.max)*100}%`, background:item.c, borderRadius:2 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio + Simulator */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="card" style={{ padding:22 }}>
          <span style={{ fontSize:13, color:C.textMid, fontWeight:500, display:"block", marginBottom:18 }}>Portföy Dağılımı</span>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={portfolio} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="oran">
                {portfolio.map((e,i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip formatter={(v,n,p)=>[`${v}%`, p.payload.ad]} contentStyle={{ background:"#1e2235", border:`1px solid ${C.border}`, borderRadius:8, fontSize:12 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:8 }}>
            {portfolio.map(item => (
              <div key={item.ad}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:2, background:item.color }}/>
                    <span style={{ fontSize:12, color:C.textMid }}>{item.ad}</span>
                  </div>
                  <span style={{ fontSize:12, fontWeight:500 }}>{item.oran}%</span>
                </div>
                <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:2 }}>
                  <div style={{ height:"100%", width:`${item.oran}%`, background:item.color, borderRadius:2 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding:22 }}>
          <span style={{ fontSize:13, color:C.textMid, fontWeight:500, display:"block", marginBottom:4 }}>Getiri Simülatörü</span>
          <p style={{ fontSize:11, color:C.textDim, marginBottom:18 }}>Geçmiş yıllık performansa göre hesaplanır</p>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:11, color:C.textMid, display:"block", marginBottom:8 }}>Yatırım Tutarı</label>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <input type="number" value={simAmount} onChange={e=>setSimAmount(Number(e.target.value))}
                style={{ flex:1, padding:"10px 14px", border:`1px solid ${C.border}`, borderRadius:8, background:C.bgInput, color:C.text, fontSize:15, fontWeight:600, outline:"none", fontFamily:F.sans }}/>
              <span style={{ color:C.textMid }}>₺</span>
            </div>
          </div>
          <input type="range" min={1000} max={1000000} step={1000} value={simAmount}
            onChange={e=>setSimAmount(Number(e.target.value))}
            style={{ width:"100%", marginBottom:20, accentColor:C.purple }}/>
          <div style={{ background:"rgba(168,85,247,0.06)", border:`1px solid rgba(168,85,247,0.15)`, borderRadius:10, padding:16, marginBottom:10 }}>
            <div style={{ fontSize:11, color:C.textDim, marginBottom:6 }}>1 Yıl Sonra (Tahmini)</div>
            <div style={{ fontSize:26, fontWeight:700, color:C.purple, marginBottom:4, fontFamily:F.serif }}>
              ₺{Math.round(simAmount + simReturn).toLocaleString("tr-TR")}
            </div>
            <div style={{ fontSize:13, color:simReturn>=0?C.green:C.red }}>
              {simReturn>=0?"+":""}{Math.round(simReturn).toLocaleString("tr-TR")} ₺ ({f.yil.toFixed(1)}%)
            </div>
          </div>
          <p style={{ fontSize:11, color:C.textDim, lineHeight:1.5 }}>⚠️ Geçmiş performans gelecek getiriyi garanti etmez.</p>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARE ──────────────────────────────────────────────────────
function CompareView({ funds, onClose }) {
  const [sel, setSel] = useState([]);
  const toggle = k => setSel(p => p.includes(k) ? p.filter(x=>x!==k) : p.length<3 ? [...p,k] : p);
  const selFunds = funds.filter(f=>sel.includes(f.kod));
  const COLORS = [C.blue, C.purple, C.pink];

  return (
    <div className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <h2 style={{ fontFamily:F.serif, fontSize:30, fontWeight:800 }}>Fon Karşılaştırma</h2>
        <button className="btn-ghost" onClick={onClose}>← Geri</button>
      </div>
      <p style={{ color:C.textMid, fontSize:13, marginBottom:16 }}>{sel.length}/3 fon seçildi</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
        {funds.map(f => (
          <button key={f.kod} className={`btn-ghost${sel.includes(f.kod)?" active":""}`}
            onClick={()=>toggle(f.kod)} style={{ padding:"6px 14px", fontSize:12 }}>
            {f.kod} {f.katilim && "☽"}
          </button>
        ))}
      </div>
      {selFunds.length >= 2 && (
        <>
          <div className="card" style={{ padding:22, marginBottom:16 }}>
            <span style={{ fontSize:13, color:C.textMid, fontWeight:500, display:"block", marginBottom:18 }}>Getiri Karşılaştırması</span>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name:"Günlük %", ...Object.fromEntries(selFunds.map(f=>[f.kod,f.gun])) },
                { name:"Aylık %", ...Object.fromEntries(selFunds.map(f=>[f.kod,f.ay])) },
                { name:"Yıllık %", ...Object.fromEntries(selFunds.map(f=>[f.kod,f.yil])) },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="name" tick={{ fontSize:11, fill:C.textDim }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:10, fill:C.textDim }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ background:"#1e2235", border:`1px solid ${C.border}`, borderRadius:8, fontSize:12 }}/>
                {selFunds.map((f,i) => <Bar key={f.kod} dataKey={f.kod} fill={COLORS[i]} radius={[4,4,0,0]}/>)}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                  <td style={{ padding:"14px 20px", fontSize:11, color:C.textDim, letterSpacing:"0.05em" }}>KRİTER</td>
                  {selFunds.map((f,i) => (
                    <td key={f.kod} style={{ padding:"14px 20px", textAlign:"center" }}>
                      <span style={{ fontFamily:F.serif, fontSize:18, fontWeight:700, color:COLORS[i] }}>{f.kod}</span>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { l:"Tür", r: f => <FundTypeBadge tur={f.tur} katilim={f.katilim}/> },
                  { l:"Fiyat", r: f => `₺${f.fiyat.toFixed(3)}` },
                  { l:"Günlük", r: f => <ReturnBadge v={f.gun}/> },
                  { l:"Aylık", r: f => <ReturnBadge v={f.ay}/> },
                  { l:"Yıllık", r: f => <ReturnBadge v={f.yil}/> },
                  { l:"Risk", r: f => <RiskDots level={f.risk}/> },
                  { l:"Fon Puanı", r: f => <ScoreRing score={scoreCalc(f)}/> },
                  { l:"Büyüklük", r: f => `₺${f.buyukluk}M` },
                  { l:"Katılım", r: f => f.katilim ? <span style={{ color:C.mint, fontSize:12 }}>☽ Evet</span> : <span style={{ color:C.textDim, fontSize:12 }}>—</span> },
                ].map((row,i) => (
                  <tr key={row.l} style={{ borderBottom:`1px solid ${C.border}`, background:i%2===0?"transparent":"rgba(255,255,255,0.01)" }}>
                    <td style={{ padding:"12px 20px", fontSize:12, color:C.textDim }}>{row.l}</td>
                    {selFunds.map(f => (
                      <td key={f.kod} style={{ padding:"12px 20px", textAlign:"center", fontSize:13 }}>{row.r(f)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ─── INVESTOR PROFILE ─────────────────────────────────────────────
function InvestorProfile({ funds, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id:"vade", q:"Yatırım vaden ne kadar?", opts:["6 aydan kısa","6-12 ay","1-3 yıl","3+ yıl"] },
    { id:"kayip", q:"Yatırımın %20 düşse ne yaparsın?", opts:["Hemen satarım","Endişelenirim ama beklerim","Fırsat olarak görürüm","Daha fazla alırım"] },
    { id:"hedef", q:"Temel hedefin nedir?", opts:["Sermayemi korumak","Enflasyonun üzerinde getiri","Orta-uzun vadede büyüme","Maksimum getiri"] },
    { id:"katilim", q:"Katılım (faizsiz) fonlara yatırım yapmak ister misin?", opts:["Evet, öncelikli tercihim","Karışık olabilir","Fark etmez","Hayır"] },
  ];

  const answer = (id, val) => {
    const a = { ...answers, [id]:val };
    setAnswers(a);
    if (step < questions.length - 1) setStep(s=>s+1);
    else {
      let risk = 3;
      if (a.vade==="6 aydan kısa") risk-=2; if (a.vade==="3+ yıl") risk+=2;
      if (a.kayip==="Hemen satarım") risk-=2; if (a.kayip==="Daha fazla alırım") risk+=2;
      if (a.hedef==="Sermayemi korumak") risk-=1; if (a.hedef==="Maksimum getiri") risk+=2;
      risk = Math.max(1, Math.min(7, risk));
      const onlyK = a.katilim==="Evet, öncelikli tercihim";
      const noK = a.katilim==="Hayır";
      const filtered = funds
        .filter(f => onlyK ? f.katilim : noK ? !f.katilim : true)
        .filter(f => Math.abs(f.risk - risk) <= 2)
        .sort((a,b) => scoreCalc(b)-scoreCalc(a)).slice(0,4);
      const profile = risk<=2?"Muhafazakâr":risk<=4?"Dengeli":risk<=5?"Büyüme Odaklı":"Agresif";
      setResult({ profile, risk, funds:filtered, onlyK });
    }
  };

  if (result) return (
    <div className="fade-up">
      <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:C.textMid, fontSize:13, marginBottom:28, fontFamily:F.sans }}>← Geri Dön</button>
      <p style={{ fontSize:11, color:C.purple, letterSpacing:"0.1em", marginBottom:10 }}>YATIRIMCI PROFİLİN</p>
      <h2 style={{ fontFamily:F.serif, fontSize:38, fontWeight:800, marginBottom:8 }} className="grad-text">{result.profile}</h2>
      <p style={{ color:C.textMid, fontSize:14, marginBottom:28 }}>Risk toleransın {result.risk}/7 · {result.onlyK&&"Katılım odaklı · "}Sana özel öneriler:</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14 }}>
        {result.funds.map(f => (
          <div key={f.kod} className="card" style={{ padding:20, border:`1px solid rgba(168,85,247,0.2)` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <span style={{ fontFamily:F.serif, fontSize:22, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>{f.kod}</span>
                <FundTypeBadge tur={f.tur} katilim={f.katilim}/>
              </div>
              <ScoreRing score={scoreCalc(f)}/>
            </div>
            <p style={{ fontSize:12, color:C.textMid, marginBottom:14, lineHeight:1.4 }}>{f.ad}</p>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div><div style={{ fontSize:10, color:C.textDim, marginBottom:4 }}>YILLIK</div><ReturnBadge v={f.yil}/></div>
              <div><div style={{ fontSize:10, color:C.textDim, marginBottom:4 }}>RİSK</div><RiskDots level={f.risk}/></div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-ghost" onClick={()=>{setStep(0);setAnswers({});setResult(null);}} style={{ marginTop:24 }}>Testi Yeniden Yap</button>
    </div>
  );

  const q = questions[step];
  return (
    <div className="fade-up">
      <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:C.textMid, fontSize:13, marginBottom:28, fontFamily:F.sans }}>← Geri Dön</button>
      <div style={{ maxWidth:520 }}>
        <div style={{ display:"flex", gap:6, marginBottom:32 }}>
          {questions.map((_,i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=step?C.purple:"rgba(255,255,255,0.08)", transition:"background 0.3s" }}/>
          ))}
        </div>
        <p style={{ fontSize:11, color:C.purple, letterSpacing:"0.1em", marginBottom:12 }}>SORU {step+1}/{questions.length}</p>
        <h2 style={{ fontFamily:F.serif, fontSize:26, fontWeight:700, marginBottom:28, lineHeight:1.3 }}>{q.q}</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {q.opts.map(opt => (
            <button key={opt} onClick={()=>answer(q.id, opt)}
              style={{ padding:"15px 20px", background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:14, textAlign:"left", cursor:"pointer", transition:"all 0.2s", fontFamily:F.sans }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.purple;e.currentTarget.style.background="rgba(168,85,247,0.08)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.bgCard;}}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────
export default function App() {
  const [funds, setFunds] = useState(FUNDS);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tümü");
  const [sortBy, setSortBy] = useState("buyukluk_desc");
  const [favOnly, setFavOnly] = useState(false);
  const [katilimOnly, setKatilimOnly] = useState(false);
  const [view, setView] = useState("list");
  const [selFund, setSelFund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(()=>setLoading(false), 600); }, []);
  const toggleFav = useCallback(k => setFunds(p=>p.map(f=>f.kod===k?{...f,favori:!f.favori}:f)), []);

  const filtered = useMemo(() => funds
    .filter(f => filterType==="Tümü" || f.tur===filterType)
    .filter(f => !favOnly || f.favori)
    .filter(f => !katilimOnly || f.katilim)
    .filter(f => f.kod.toLowerCase().includes(search.toLowerCase()) || f.ad.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => {
      const [k,d] = sortBy.split("_");
      const key = k==="yil"?"yil":k==="gun"?"gun":k;
      return (a[key]-b[key])*(d==="desc"?-1:1);
    }), [funds, filterType, favOnly, katilimOnly, search, sortBy]);

  const favCount = funds.filter(f=>f.favori).length;
  const topFund = [...funds].sort((a,b)=>b.yil-a.yil)[0];
  const avgYil = (funds.reduce((s,f)=>s+f.yil,0)/funds.length).toFixed(1);
  const katilimCount = funds.filter(f=>f.katilim).length;

  return (
    <>
      <style>{G}</style>
      <div style={{ minHeight:"100vh", background:C.bg }}>

        {/* NAV */}
        <nav style={{ background:"rgba(14,16,21,0.96)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100 }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:30, height:30, background:"linear-gradient(135deg,#3b82f6,#a855f7)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:14, fontWeight:800, fontFamily:F.serif }}>F</span>
              </div>
              <span style={{ fontFamily:F.serif, fontSize:19, fontWeight:700, color:C.text }}>
                Fon<span className="grad-text">cu</span>
              </span>
            </div>
            <div style={{ display:"flex", gap:28, alignItems:"center" }}>
              {[
                { l:"Fonlar", v:"list" },
                { l:"Karşılaştır", v:"compare" },
                { l:"Profil Testi", v:"profile" },
              ].map(item => (
                <span key={item.v} className={`nav-link${view===item.v&&!selFund?" active":""}`}
                  onClick={()=>{setView(item.v);setSelFund(null);}}>
                  {item.l}
                </span>
              ))}
              <span className="nav-link" onClick={()=>{setFavOnly(true);setView("list");setSelFund(null);}}>
                Favoriler
                {favCount>0 && <span style={{ marginLeft:6, background:"linear-gradient(135deg,#a855f7,#ec4899)", color:"#fff", fontSize:10, fontWeight:700, borderRadius:20, padding:"1px 7px" }}>{favCount}</span>}
              </span>
            </div>
          </div>
        </nav>

        {/* HERO */}
        {view==="list" && !selFund && (
          <div style={{ background:"linear-gradient(180deg,#0a0c14 0%,#0e1015 100%)", borderBottom:`1px solid ${C.border}`, padding:"48px 28px 44px" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <p style={{ fontSize:11, color:C.purple, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:14 }}>Türkiye Elektronik Fon Alım Satım Platformu</p>
              <h1 style={{ fontFamily:F.serif, fontSize:52, fontWeight:800, color:C.text, lineHeight:1.1, marginBottom:16 }}>
                {funds.length} Yatırım Fonunu<br/>
                <span className="grad-text">Keşfedin</span>
              </h1>
              <p style={{ color:C.textMid, fontSize:14, marginBottom:36, maxWidth:460, lineHeight:1.7 }}>
                Gerçek zamanlı fiyatlar, getiri analizi ve risk değerlendirmesi ile bilinçli yatırım kararları alın.
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {[
                  { l:"Toplam Fon", v:funds.length },
                  { l:"Ort. Yıllık Getiri", v:`%${avgYil}` },
                  { l:"En İyi Fon", v:topFund.kod },
                  { l:"Katılım Fonu", v:katilimCount },
                  { l:"Favorilerim", v:favCount },
                ].map(s => (
                  <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.07)`, borderRadius:10, padding:"14px 22px", minWidth:110 }}>
                    <div style={{ fontSize:11, color:C.textMid, marginBottom:6, letterSpacing:"0.04em" }}>{s.l}</div>
                    <div style={{ fontFamily:F.serif, fontSize:24, fontWeight:800, background:"linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN */}
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"28px 28px" }}>

          {view==="compare" && <CompareView funds={funds} onClose={()=>setView("list")}/>}
          {view==="profile" && <InvestorProfile funds={funds} onClose={()=>setView("list")}/>}

          {view==="list" && selFund && (
            <FundDetail f={selFund} onBack={()=>setSelFund(null)} onFav={k=>{toggleFav(k);setSelFund(p=>({...p,favori:!p.favori}));}}/>
          )}

          {view==="list" && !selFund && (
            <>
              {/* FILTERS */}
              <div className="card" style={{ padding:"16px 20px", marginBottom:14 }}>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
                  <div style={{ position:"relative", flex:1, minWidth:200 }}>
                    <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:14, height:14 }} viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input className="input-dark" placeholder="Fon kodu veya adıyla ara..." value={search} onChange={e=>setSearch(e.target.value)}/>
                  </div>
                  <select className="select-dark" value={filterType} onChange={e=>setFilterType(e.target.value)}>
                    {FUND_TYPES.map(t=><option key={t}>{t}</option>)}
                  </select>
                  <select className="select-dark" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                    {SORTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                  <button className={`btn-ghost${katilimOnly?" active":""}`} onClick={()=>setKatilimOnly(p=>!p)}>
                    ☽ Katılım
                  </button>
                  <button className={`btn-ghost${favOnly?" active":""}`} onClick={()=>setFavOnly(p=>!p)}>
                    ★ Favoriler
                  </button>
                </div>
                {(search||filterType!=="Tümü"||favOnly||katilimOnly) && (
                  <div style={{ marginTop:12, fontSize:12, color:C.textMid, display:"flex", alignItems:"center", gap:10 }}>
                    <span><b style={{ color:C.text }}>{filtered.length}</b> fon</span>
                    {katilimOnly && <span className="badge badge-mint">☽ Katılım</span>}
                    {favOnly && <span className="badge badge-purple">★ Favoriler</span>}
                    <button onClick={()=>{setSearch("");setFilterType("Tümü");setFavOnly(false);setKatilimOnly(false);}} style={{ background:"none", border:"none", color:C.purple, cursor:"pointer", fontSize:12, fontFamily:F.sans }}>Sıfırla ×</button>
                  </div>
                )}
              </div>

              {/* LIST */}
              {loading ? (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {[1,2,3,4,5].map(i=><div key={i} className="skeleton" style={{ height:96 }}/>)}
                </div>
              ) : filtered.length===0 ? (
                <div style={{ textAlign:"center", padding:"60px 0", color:C.textMid }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
                  <p>Arama kriterlerine uygun fon bulunamadı.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {filtered.map(f=><FundRow key={f.kod} f={f} onClick={setSelFund} onFav={toggleFav}/>)}
                </div>
              )}
            </>
          )}
        </div>

        <footer style={{ borderTop:`1px solid ${C.border}`, marginTop:60, padding:"24px 28px", textAlign:"center" }}>
          <p style={{ fontFamily:F.serif, fontSize:15, fontWeight:700, marginBottom:4 }}>
            <span className="grad-text">Foncu</span>
          </p>
          <p style={{ fontSize:11, color:C.textDim }}>Bu uygulama yatırım tavsiyesi niteliği taşımaz. TEFAS verileri bilgilendirme amaçlıdır.</p>
        </footer>
      </div>
    </>
  );
}
