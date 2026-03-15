"use client";

interface ColorSectionItem {
  title: string;
  description: string;
}

interface ColorSectionProps {
  label: string;
  headline: string;
  color?: string;
  items: ColorSectionItem[];
}

export const ColorSection: React.FC<ColorSectionProps> = ({
  label,
  headline,
  color,
  items,
}) => {
  const hasColor = !!color;

  return (
    <div
      style={{
        background: hasColor ? color : "transparent",
        borderRadius: hasColor ? "16px" : undefined,
        padding: hasColor ? "48px 40px" : "48px 0",
        marginTop: "32px",
        marginBottom: "32px",
        width: hasColor ? "calc(100% + 80px)" : "100%",
        marginLeft: hasColor ? "-40px" : undefined,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-heading), monospace",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hasColor
            ? "rgba(0,0,0,0.4)"
            : "var(--neutral-on-background-weak, #999)",
          marginBottom: "12px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-heading), monospace",
          fontSize: "24px",
          fontWeight: 600,
          color: hasColor
            ? "#000"
            : "var(--neutral-on-background-strong, #111)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          marginBottom: "36px",
        }}
      >
        {headline}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: hasColor
                ? "rgba(0,0,0,0.08)"
                : "var(--surface-background, #f5f5f5)",
              border: hasColor
                ? undefined
                : "1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))",
              borderRadius: "12px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading), monospace",
                fontSize: "32px",
                fontWeight: 700,
                color: hasColor
                  ? "rgba(0,0,0,0.15)"
                  : "var(--neutral-alpha-medium, rgba(0,0,0,0.1))",
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading), monospace",
                fontSize: "16px",
                fontWeight: 600,
                color: hasColor
                  ? "#000"
                  : "var(--neutral-on-background-strong, #111)",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "13px",
                color: hasColor
                  ? "rgba(0,0,0,0.6)"
                  : "var(--neutral-on-background-medium, #666)",
                lineHeight: 1.65,
              }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
