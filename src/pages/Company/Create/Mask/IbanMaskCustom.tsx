import React, { ReactElement } from "react";

import MaskedInput from "react-text-mask";

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const IbanMaskCustom = (props: TextMaskCustomProps): ReactElement => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      //FR17 2004 1010 1254 0796 1J03 367
      mask={[
        "FR",
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
};

export default IbanMaskCustom;
