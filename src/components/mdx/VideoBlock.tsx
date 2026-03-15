"use client";

interface VideoBlockProps {
  src: string;
  caption?: string;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ src, caption }) => {
  return (
    <div
      style={{
        marginTop: "24px",
        marginBottom: "24px",
      }}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))",
          display: "block",
        }}
      />
      {caption && (
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "13px",
            color: "var(--neutral-on-background-weak, #999)",
            marginTop: "10px",
            lineHeight: 1.5,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};
