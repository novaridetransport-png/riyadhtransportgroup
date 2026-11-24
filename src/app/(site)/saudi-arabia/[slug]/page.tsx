import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/routes/content-page";
import { isPublished, type SaudiRoutePath } from "@/config/urls";
import { saudiRoutes } from "@/content/saudi-routes";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };
const paths = Object.keys(saudiRoutes) as SaudiRoutePath[];

export const dynamicParams = false;
export const generateStaticParams = () => paths.filter(isPublished).map((p) => ({ slug: p.split("/")[2] }));

async function resolve(params: Props["params"]) {
  const path = `/saudi-arabia/${(await params).slug}/` as SaudiRoutePath;
  if (!paths.includes(path) || !isPublished(path)) notFound();
  return { path, content: saudiRoutes[path] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path, content } = await resolve(params);
  return pageMetadata(path, content.title, content.description);
}

export default async function Page({ params }: Props) {
  const { path, content } = await resolve(params);
  return <ContentPage path={path} content={content} opposite={content.opposite} />;
}
