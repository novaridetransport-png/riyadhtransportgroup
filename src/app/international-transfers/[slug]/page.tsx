import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/routes/content-page";
import { isPublished, type InternationalRoutePath } from "@/config/urls";
import { internationalRoutes } from "@/content/international-routes";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };
const paths = Object.keys(internationalRoutes) as InternationalRoutePath[];

export const dynamicParams = false;
export const generateStaticParams = () => paths.filter(isPublished).map((p) => ({ slug: p.split("/")[2] }));

async function resolve(params: Props["params"]) {
  const path = `/international-transfers/${(await params).slug}/` as InternationalRoutePath;
  if (!paths.includes(path) || !isPublished(path)) notFound();
  return { path, content: internationalRoutes[path] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path, content } = await resolve(params);
  return pageMetadata(path, content.title, content.description);
}

export default async function Page({ params }: Props) {
  const { path, content } = await resolve(params);
  return <ContentPage path={path} content={content} opposite={content.opposite} />;
}
