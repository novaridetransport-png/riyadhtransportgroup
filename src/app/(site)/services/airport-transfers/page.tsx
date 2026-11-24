import { ContentPage } from "@/components/routes/content-page";
import { landingPages } from "@/content/landing-pages";
import { pageMetadata } from "@/lib/seo/metadata";

const path = "/services/airport-transfers/";
const content = landingPages[path];

export const metadata = pageMetadata(path, content.title, content.description);

export default function Page() {
  return <ContentPage path={path} content={content} />;
}
