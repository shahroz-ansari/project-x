import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import AddProject from "../../forms/add-project.component"
import HeaderComponent from "../../ui-components/header.component"
import { updateProject } from "../../../store/reducers/projects";
import { putRecord } from "../../../helpers/db/idb-query";
import { _projects } from '../../../store/selectors';

const ProjectEdit = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useParams();

  const projectList = useSelector(_projects)
  const project = projectList.find(item => item.id === parseInt(projectId))

  const onSubmit = async (data) => {
    putRecord('project', data, (doc) => {
      dispatch(updateProject(doc))
      navigate(-1)
    })
  }

  return <>
    <HeaderComponent title="Edit project" />

    <AddProject mode="edit" onSubmit={onSubmit} project={project} />
  </>
}

export default ProjectEdit