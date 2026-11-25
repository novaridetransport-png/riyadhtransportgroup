import { isPublished } from "./urls";

/**
 * Lets the booking form store inquiries in Supabase. On unless the variable is "false",
 * and only while the privacy page is published, so data can never be collected without a notice.
 * Kept apart from site.ts so that contact details never reach the browser bundle.
 */
export const formSubmissionsEnabled = process.env.NEXT_PUBLIC_FORM_SUBMISSIONS_ENABLED !== "false" && isPublished("/privacy-policy/");
