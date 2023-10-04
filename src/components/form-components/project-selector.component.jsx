import { useSelector } from 'react-redux';
import InputComponent from './core/input.component';
import { _activeProjects } from '../../store/selectors';
import generateSelectList from '../../helpers/generate-select-list';
import { forwardRef } from 'react';

const ProjectSelector = function({ label, ...rest }, ref) {
  const projects = useSelector(_activeProjects)

  return <InputComponent
    ref={ref}
    select
    selectList={generateSelectList(projects, {labelKey: 'name'})}
    label={label || "Project"}
    {...rest}
  />
}

export default forwardRef(ProjectSelector)