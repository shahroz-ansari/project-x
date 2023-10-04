import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import AddProject from "../../forms/add-project.component"
import HeaderComponent from "../../ui-components/header.component"
import { addProject } from "../../../store/reducers/projects";
import { addRecord } from "../../../helpers/db/idb-query";

const ProjectCreate = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    addRecord('project', data, (doc) => {
      dispatch(addProject(doc))
      navigate(-1)
    })
  }

  return <>
    <HeaderComponent title="Add new project" />

    <AddProject onSubmit={onSubmit} />
  </>
}

export default ProjectCreate