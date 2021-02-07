import React, { ReactElement } from "react";
import styled from "styled-components";

const SortSelect = styled.select`
  width: 150px;
  height: 32px;
  padding-left: 8px;
`;

interface SelectInputProps {
  options: Array<string>;
}

function SelectInput(props: SelectInputProps): ReactElement {
  const { options, ...selectProps } = props;

  const showOptions = options.map((option, index) => (
    <option key={index}>{option}</option>
  ));

  return <SortSelect {...selectProps}>{showOptions}</SortSelect>;
}

SelectInput.defaultProps = {
  options: [],
};

export default SelectInput;
