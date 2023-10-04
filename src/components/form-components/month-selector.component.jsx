import { forwardRef } from 'react';
import { Months } from '../../constants';
import generateSelectList from '../../helpers/generate-select-list';
import InputComponent from './core/input.component';

const MonthSelector = function({ label, ...rest }, ref) {
  return <InputComponent
    {...rest}
    select
    selectList={generateSelectList(Months)}
    label={label || "Month"}
    ref={ref}
  />
}

export default forwardRef(MonthSelector)