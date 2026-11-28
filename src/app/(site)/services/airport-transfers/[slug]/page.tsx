import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/routes/content-page";
import { isPublished, type AirportPath } from "@/config/urls";
import { airportPages } from "@/content/airports";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };
const paths = Object.keys(airportPages) as AirportPath[];

export const dynamicParams = false;
export const generateStaticParams = () => paths.filter(isPublished).map((p) => ({ slug: p.split("/")[3] }));

async function resolve(params: Props["params"]) {
  const path = `/services/airport-transfers/${(await params).slug}/` as AirportPath;
  if (!paths.includes(path) || !isPublished(path)) notFound();
  return { path, content: airportPages[path as keyof typeof airportPages] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path, content } = await resolve(params);
  return pageMetadata(path, content.title, content.description);
}

export default async function Page({ params }: Props) {
  const { path, content } = await resolve(params);
  return <ContentPage path={path} content={content} />;
}
