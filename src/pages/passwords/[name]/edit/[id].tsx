import React from "react";
import SiteForm from "../../../../components/SiteForm";
import Head from "../../../../components/Head";
import useSiteForm from "../../../../hooks/useSiteForm";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";

const Edit = () => {
  const router = useRouter();
  const userId = Number(router.query.id);
  const editQuery = trpc.useQuery(["site.getSite", userId]);
  console.log(editQuery.data);
  const { onSubmit } = useSiteForm({
    successMessage: "test",
    mutationEndpoint: "site.updateSite",
  });
  return (
    <>
      <Head title="Modify Site" />
      <SiteForm
        onSubmit={onSubmit}
        heading="Modify Site"
        site={editQuery.data}
      />
    </>
  );
};

Edit.auth = true;

export default Edit;
