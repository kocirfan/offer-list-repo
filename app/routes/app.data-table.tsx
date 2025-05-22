// app/routes/app/data-table.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Card, DataTable, Page } from "@shopify/polaris";

// API'den veri çekme
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  const response = await fetch("http://localhost:5049/api/data");
  const users = await response.json();

  // Tabloya uygun hale getirtest
  const rows = users.map((user: any) => [
    user.quotationNo.toString(),
  user.dateStr,
  user.deliveryInfo?.email || "",
  user.offers.map((offer: any) => offer.title).join(", ")
  ]);

  return json({ rows });
};

export default function DataTablePage() {
  const { rows } = useLoaderData<typeof loader>();

  return (
    <Page title="API Verileri Tablosu">
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text", "text"]}
          headings={["ID", "İsim", "E-posta", "Şirket"]}
          rows={rows}
        />
      </Card>
    </Page>
  );
}
