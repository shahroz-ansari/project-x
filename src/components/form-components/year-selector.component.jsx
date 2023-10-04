import { forwardRef } from 'react';
import { Years } from '../../constants';
import generateSelectList from '../../helpers/generate-select-list';
import InputComponent from './core/input.component';

const YearSelector = function({ label, ...rest }, ref) {
  return <InputComponent
    {...rest}
    select
    selectList={generateSelectList(Years)}
    label={label || "Year"}
    ref={ref}
  />
}

export default forwardRef(YearSelector)