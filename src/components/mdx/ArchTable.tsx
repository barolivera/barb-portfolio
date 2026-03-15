"use client";

interface ArchRow {
  entity: string;
  description: string;
  expiration: string;
  attributes: string;
}

interface ArchTableProps {
  rows: ArchRow[];
}

function ExpirationBadge({ value }: { value: string }) {
  let bg = "rgba(150,150,150,0.15)";
  let color = "rgba(150,150,150,0.8)";

  if (value.includes("renewable") || value.includes("365d")) {
    bg = "rgba(34,197,94,0.12)";
    color = "rgba(34,197,94,0.85)";
  } else if (value.includes("10 year")) {
    bg = "rgba(139,92,246,0.12)";
    color = "rgba(139,92,246,0.85)";
  } else if (value.includes("+30d") || value.includes("date")) {
    bg = "rgba(150,150,150,0.1)";
    color = "rgba(150,150,150,0.7)";
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        fontFamily: "var(--font-body), sans-serif",
        fontWeight: 500,
        background: bg,
        color: color,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}

export const ArchTable: React.FC<ArchTableProps> = ({ rows }) => {
  const headerStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "11px",
    fontFamily: "var(--font-heading), monospace",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "var(--neutral-on-background-weak, #888)",
    borderBottom: "1px solid var(--neutral-alpha-weak, rgba(150,150,150,0.15))",
  };

  const cellStyle: React.CSSProperties = {
    padding: "14px 16px",
    fontSize: "13px",
    fontFamily: "var(--font-body), sans-serif",
    color: "var(--neutral-on-background-medium, #666)",
    lineHeight: 1.5,
    borderBottom: "1px solid var(--neutral-alpha-weak, rgba(150,150,150,0.08))",
  };

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        marginTop: "24px",
        marginBottom: "24px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "640px",
        }}
      >
        <thead>
          <tr>
            <th style={headerStyle}>Entity</th>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Expiration</th>
            <th style={headerStyle}>Key Attributes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td
                style={{
                  ...cellStyle,
                  fontFamily: "var(--font-heading), monospace",
                  fontWeight: 600,
                  color: "var(--neutral-on-background-strong, #111)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.entity}
              </td>
              <td style={cellStyle}>{row.description}</td>
              <td style={cellStyle}>
                <ExpirationBadge value={row.expiration} />
              </td>
              <td
                style={{
                  ...cellStyle,
                  fontFamily: "var(--font-code), monospace",
                  fontSize: "12px",
                  color: "var(--neutral-on-background-weak, #999)",
                }}
              >
                {row.attributes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
