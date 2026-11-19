import { UpdateForm, UploadForm } from "@/components/lp/admin-forms";
import { setDocumentPublished } from "@/lib/admin-actions";
import { fmt, listAllDocuments } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDocuments() {
  await requireAdmin();
  const docs = await listAllDocuments();
  return (
    <div className="space-y-14">
      <section>
        <h1 className="display text-4xl text-heading">Documents</h1>
        <p className="mt-2 text-muted">The data room. LPs can view published documents in the browser; they cannot download them.</p>
        <ul className="mt-8 divide-y divide-line rounded-xl border border-line bg-paper">
          {docs.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium text-ink">{d.title}</p>
                <p className="text-sm text-muted">{d.category} · added {fmt(d.created_at)}</p>
              </div>
              <form action={setDocumentPublished} className="flex items-center gap-4">
                <input type="hidden" name="id" value={d.id} />
                <input type="hidden" name="published" value={String(!d.published)} />
                <span className={`rounded-full px-2.5 py-1 text-xs ${d.published ? "bg-wine-800 text-cream" : "bg-sand text-muted"}`}>{d.published ? "Visible" : "Hidden"}</span>
                <button className="text-sm text-accent underline">{d.published ? "Hide" : "Publish"}</button>
              </form>
            </li>
          ))}
          {!docs.length && <li className="px-5 py-8 text-center italic text-muted">No documents yet.</li>}
        </ul>
      </section>
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="display mb-6 text-2xl text-heading">Add a document</h2>
          <UploadForm />
        </section>
        <section>
          <h2 className="display mb-6 text-2xl text-heading">Post an update</h2>
          <UpdateForm />
        </section>
      </div>
    </div>
  );
}
