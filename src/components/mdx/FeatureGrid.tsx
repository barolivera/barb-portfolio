"use client";

import { Search, QrCode, Sparkles, Users, LayoutDashboard, Fingerprint, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Search,
  QrCode,
  Sparkles,
  Users,
  LayoutDashboard,
  Fingerprint,
};

interface Feature {
  badge: string;
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "100%",
        marginTop: "24px",
        marginBottom: "24px",
      }}
    >
      {features.map((feature, i) => (
        <div
          key={i}
          style={{
            background: "var(--surface-background, #f5f5f5)",
            border: "1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))",
            borderRadius: "12px",
            padding: "24px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              fontSize: "10px",
              fontFamily: "var(--font-heading), monospace",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--neutral-on-background-weak, #999)",
            }}
          >
            {feature.badge}
          </div>
          <div style={{ lineHeight: 1, color: "var(--neutral-on-background-strong, #111)" }}>
            {iconMap[feature.icon] ? (
              (() => { const IconComponent = iconMap[feature.icon]; return <IconComponent size={28} strokeWidth={1.5} />; })()
            ) : (
              <span style={{ fontSize: "28px" }}>{feature.icon}</span>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-heading), monospace",
              fontWeight: 600,
              fontSize: "15px",
              color: "var(--neutral-on-background-strong, #111)",
              lineHeight: 1.3,
            }}
          >
            {feature.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "13px",
              color: "var(--neutral-on-background-medium, #666)",
              lineHeight: 1.6,
            }}
          >
            {feature.description}
          </div>
        </div>
      ))}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};
