import { AdminNav } from "@/components/admin/admin-nav";
import { SettingsForm } from "@/components/admin/documents/settings-form";
import { getSettings } from "@/lib/admin/documents";
import { requireAdmin } from "@/lib/admin/supabase";

export default async function SettingsPage() {
  const token = await requireAdmin();
  const settings = await getSettings(token);
  return (
    <>
      <AdminNav current="settings" />
      <h1 className="mt-6 text-section text-navy">Settings</h1>
      <p className="mt-2 max-w-2xl">Used for new quotations, invoices and receipts. Existing documents keep their own details.</p>
      <SettingsForm initial={settings} />
    </>
  );
}
