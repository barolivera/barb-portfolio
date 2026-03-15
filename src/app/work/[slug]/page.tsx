import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ArrowUpRight, Play } from "lucide-react";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  const rawTags = Array.isArray(post.metadata.tag)
    ? post.metadata.tag
    : post.metadata.tag
      ? [post.metadata.tag]
      : [];
  const tags = rawTags.flatMap((t: string) => t.split(" · ").map((s: string) => s.trim()).filter(Boolean));

  return (
    <Column as="section" fillWidth horizontal="center">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section */}
      <Column
        fillWidth
        horizontal="center"
        paddingX="l"
        paddingTop="80"
        paddingBottom="40"
        style={{ background: "#F5F5F5" }}
      >
        <Column maxWidth="m" gap="16" fillWidth>
          <SmartLink href="/work">
            <Text variant="label-strong-s" onBackground="neutral-weak">
              ← Back to projects
            </Text>
          </SmartLink>

          <Heading
            as="h1"
            variant="display-strong-xl"
            wrap="balance"
          >
            {post.metadata.title}
          </Heading>

          <Text
            variant="heading-default-l"
            onBackground="neutral-medium"
            wrap="balance"
            style={{ maxWidth: "720px" }}
          >
            {post.metadata.summary}
          </Text>

          {tags.length > 0 && (
            <Row gap="8" vertical="center" wrap>
              {tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  style={{
                    border: "1px solid var(--neutral-on-background-strong, #111)",
                    background: "transparent",
                    fontFamily: "var(--font-heading), monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    color: "var(--neutral-on-background-strong, #111)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </Row>
          )}

          <Row gap="8" vertical="center" marginTop="8">
            {post.metadata.link && (
              <a
                href={post.metadata.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid var(--neutral-on-background-strong, #111)",
                  background: "transparent",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "13px",
                  color: "var(--neutral-on-background-strong, #111)",
                  textDecoration: "none",
                }}
              >
                View Project <ArrowUpRight size={16} />
              </a>
            )}
            {post.metadata.demo && (
              <a
                href={post.metadata.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid var(--neutral-on-background-strong, #111)",
                  background: "transparent",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "13px",
                  color: "var(--neutral-on-background-strong, #111)",
                  textDecoration: "none",
                }}
              >
                Watch Demo <Play size={16} />
              </a>
            )}
            {post.metadata.team && post.metadata.team.length > 0 && (
              <Row gap="12" vertical="center">
                <AvatarGroup reverse avatars={avatars} size="s" />
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {post.metadata.team.map((member) => member.name).join(", ")}
                </Text>
              </Row>
            )}
          </Row>
        </Column>
      </Column>


      {/* Case Study Content */}
      <Column
        fillWidth
        horizontal="center"
        paddingX="l"
        paddingY="48"
      >
        <Column
          as="article"
          fillWidth
          style={{ maxWidth: "680px" }}
        >
          <CustomMDX source={post.content} />
        </Column>
      </Column>

      {/* Related Projects */}
      <Column fillWidth gap="40" horizontal="center" paddingX="l" paddingTop="40" paddingBottom="80" maxWidth="m">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
