import { isPublished } from "./urls";

/**
 * Lets the booking form store inquiries in Supabase. Needs the environment switch
 * AND a published privacy page, so data can never be collected without a notice.
 * Kept apart from site.ts so that contact details never reach the browser bundle.
 */
export const formSubmissionsEnabled = process.env.NEXT_PUBLIC_FORM_SUBMISSIONS_ENABLED === "true" && isPublished("/privacy-policy/");
