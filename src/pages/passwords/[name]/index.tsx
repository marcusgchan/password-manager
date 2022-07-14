import { useState, useEffect } from "react";
import Layout from "../../../shared/components/layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import type { Site } from "@prisma/client";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Name = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(["site.getSites"]);
  const [sites, setSites] = useState(data ?? []);

  const columns: ColumnDef<Site>[] = [
    {
      accessorKey: "id",
    },
    {
      accessorKey: "name",
    },
    {
      accessorKey: "email",
    },
    {
      accessorKey: "password",
    },
    {
      accessorKey: "dateCreated",
    },
  ];

  // const columns: ColumnDef<InferQueryOutput<"site.getSite">>[] = [
  //   {
  //     accessorKey: "",
  //   },
  //   {
  //     accessorKey: "name",
  //   },
  //   {
  //     accessorKey: "email",
  //   },
  //   {
  //     accessorKey: "password",
  //   },
  // ];
  const table = useReactTable({
    data: sites,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!isLoading && data) {
      setSites(data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className="flex justify-between outline-red outline-2">
        <input type="text" className="border-black border-2" />
        <button
          className="w-12"
          onClick={() => router.push(`${router.asPath}/new`)}
        >
          <Image
            src="/add-icon.svg"
            alt="add new password"
            height="40"
            width="40"
            layout="responsive"
          />
        </button>
      </section>
      <section>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
};

Name.auth = true;

export default Name;
