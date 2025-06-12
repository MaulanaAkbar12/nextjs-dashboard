import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ]);
    // const invoice = await fetch(`/api/invoices/${id}`).then(res => res.json());
    // const customers = await fetchCustomers();

    if (!invoice) {
        notFound();
    }

    if (!customers) {
        return <p>No customers found</p>;
    }

// export default async function Page () {
    return (
        <main>
            <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoice', href: `/dashboard/invoice/${id}/edit`},
            { label: 'Edit Invoice',
            href: `/dashboard/invoice/${id}/edit`,
            active: true,
            },
            ]}
        />
        <Form invoice={invoice} customers={customers}/>
        </main>
    )
}
// }