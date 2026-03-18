import React from "react";
import {
  Heading,
  RevealFx,
  Column,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";
import ShaderGradientBg from "@/components/ShaderGradientBg";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Full-bleed Gradient Hero */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Shader gradient background */}
        <ShaderGradientBg />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "946px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: "var(--responsive-space-l)",
            paddingRight: "var(--responsive-space-l)",
          }}
        >
          <RevealFx translateY="4" fillWidth horizontal="center">
            <Heading
              as="h1"
              wrap="balance"
              variant="display-strong-xl"
              align="center"
              style={{
                color: "#0a0a0a",
                fontSize: "64px",
                lineHeight: "68px",
                letterSpacing: "-2.56px",
                fontWeight: 600,
              }}
            >
              {"Hello, I'm Barb – a Product Designer crafting digital experiences, one pixel at a time.".split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                  >
                    {word}
                  </span>
                  {" "}
                </React.Fragment>
              ))}
            </Heading>
          </RevealFx>
        </div>
      </div>

      {/* Projects section */}
      <Column maxWidth="m" gap="xl" paddingY="64" horizontal="center" fillWidth paddingX="l">
        <Heading as="h2" variant="heading-strong-xl" style={{ letterSpacing: "-0.02em" }}>
          Featured Projects
        </Heading>
        <Projects featured />
      </Column>

      {/* Hero styles */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-word {
          display: inline-block;
          opacity: 0;
          animation: fadeSlideUp 0.7s ease-out forwards;
        }

      `}</style>
    </Column>
  );
}
