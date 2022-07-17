import { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import type { Site } from "@prisma/client";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import Table from "../../../components/Table";
import { FaEdit, FaTrash } from "react-icons/fa";

const Name = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(["site.getSites"]);
  const [sites, setSites] = useState(data ?? []);
  const [selectedRow, setSelectedRow] = useState({ id: "" });

  const handleShowPassword = (id: string) => {
    if (id === selectedRow.id) {
      return setSelectedRow({ id: "" });
    }
    setSelectedRow({ id });
  };

  const columns: ColumnDef<Site>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "password",
      header: "Password",
      cell: ({ getValue, row }: { getValue: () => any; row: Row<Site> }) => {
        return (
          <button
            onClick={() => handleShowPassword(row.id)}
            className="block w-full text-left"
          >
            {selectedRow.id === row.id ? getValue() : "********************"}
          </button>
        );
      },
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: (props) => {
        return <span>{props.getValue<Date>().toLocaleDateString()}</span>;
      },
    },
    {
      header: "Action",
      cell: (props) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`${router.asPath}/edit`)}
              className="border-2 border-black flex justify-center align-center p-1 rounded"
            >
              <FaEdit className="text-2xl" />
            </button>
            <button className="border-2 border-black flex justify-center align-center p-1 rounded">
              <FaTrash className="text-2xl" />
            </button>
          </div>
        );
      },
    },
  ];

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
      <section className="flex overflow-scroll">
        <Table table={table} />
      </section>
    </Layout>
  );
};

Name.auth = true;

export default Name;
