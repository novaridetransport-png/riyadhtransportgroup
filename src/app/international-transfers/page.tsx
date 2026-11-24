import { BorderNotice } from "@/components/routes/border-notice";
import { ContentPage } from "@/components/routes/content-page";
import { RouteDirectory } from "@/components/routes/route-directory";
import { landingPages } from "@/content/landing-pages";
import { pageMetadata } from "@/lib/seo/metadata";

const path = "/international-transfers/";
const content = landingPages[path];

export const metadata = pageMetadata(path, content.title, content.description);

export default function Page() {
  return <ContentPage path={path} content={content}><BorderNotice enteringSaudi /><RouteDirectory directory={path} /></ContentPage>;
}
