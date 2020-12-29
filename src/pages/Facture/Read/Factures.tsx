import React, { FC, ReactElement } from "react";
import FactureList from "./FactureList";
import { useIntl } from "react-intl";
import PageLayout from "../../../components/PageLayout/PageLayout";

const Factures: FC<{}> = (): ReactElement => {
  const intl = useIntl();
  return (
    <PageLayout
      title={intl.formatMessage({ id: "factures.title" })}
      content={<FactureList />}
    />
  );
};

export default Factures;
