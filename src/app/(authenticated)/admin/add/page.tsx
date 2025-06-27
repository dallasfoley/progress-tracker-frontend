import AdminAddBookForm from "@/components/forms/admin-add-book-form";
import { formStyles } from "@/components/forms/admin-update-book-form";

export default function AddBookPage() {
  return (
    <div className={formStyles.container}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Update Book Details
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Modify the book information below
        </p>
      </div>
      <AdminAddBookForm />
    </div>
  );
}
