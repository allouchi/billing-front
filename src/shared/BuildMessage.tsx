import React from 'react';
import { useIntl } from "react-intl";

const BuildMessage = (paramId: string, paramCle: string) => {
    const intl = useIntl();
    return intl.formatMessage(
        { id: paramId },
        { cle: paramCle }
      );
}

export default BuildMessage;
