/**
 * LuxuryBg — Decorative background layer shared across all pages.
 * Drop it as the first child inside any <main> that needs the premium look.
 */
export function LuxuryBg() {
  return (
    <>
      {/* Dot grid */}
      <div className="bg-dots" />
      {/* Diagonal accent lines */}
      <div className="bg-diag" />
      {/* Vertical side lines */}
      <div className="bg-vline-left" />
      <div className="bg-vline-right" />
      {/* Gold orbs */}
      <div className="bg-orb-tl" />
      <div className="bg-orb-br" />
      <div className="bg-orb-center" />
      {/* Horizontal lines */}
      <div className="bg-line-top" />
      <div className="bg-line-bottom" />
      {/* Corner frame accents */}
      <div className="bg-corner-tl" />
      <div className="bg-corner-tr" />
      {/* Floating diamond ornaments */}
      <div className="bg-diamond" style={{ top: "22%", left: "8%" }} />
      <div className="bg-diamond" style={{ top: "65%", right: "7%", animationDelay: "2s" }} />
      <div className="bg-diamond" style={{ top: "42%", left: "50%", animationDelay: "4s", opacity: 0.1 }} />
    </>
  );
}
