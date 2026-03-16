import React from "react";
import {
  Heading,
  RevealFx,
  Column,
  Flex,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";

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
      <Flex
        fillWidth
        horizontal="center"
        vertical="center"
        position="relative"
        style={{
          minHeight: "max(70vh, 680px)",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/background gradient.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Grain overlay */}
        <div className="hero-grain" />

        {/* Hero content */}
        <Column
          horizontal="center"
          align="center"
          paddingX="l"
          position="relative"
          zIndex={1}
          style={{ maxWidth: "946px" }}
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
        </Column>
      </Flex>

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

        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.35;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 100%;
          pointer-events: none;
        }
      `}</style>
    </Column>
  );
}
