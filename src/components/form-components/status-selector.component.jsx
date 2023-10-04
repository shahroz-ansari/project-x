import { forwardRef } from 'react';
import { Status } from '../../constants';
import generateSelectList from '../../helpers/generate-select-list';
import InputComponent from './core/input.component';

const StatusSelector = function({ label, ...rest }, ref) {
  return <InputComponent
    select
    selectList={generateSelectList(Status)}
    label={label || "Status"}
    ref={ref}
    {...rest}
  />
}

export default forwardRef(StatusSelector)