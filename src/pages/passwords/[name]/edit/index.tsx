import React from "react";
import SiteForm from "../../../../components/SiteForm";
import Head from "../../../../components/Head";
import useSiteForm from "../../../../hooks/useSiteForm";

const Edit = () => {
  const { onSubmit } = useSiteForm({
    successMessage: "test",
    mutationEndpoint: "site.updateSite",
  });
  return (
    <>
      <Head title="Modify Site" />
      <SiteForm onSubmit={onSubmit} heading="Modify Site" />
    </>
  );
};

Edit.auth = true;

export default Edit;
