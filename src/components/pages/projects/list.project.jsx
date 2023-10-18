import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Stack,
  Card,
  CardActions,
  CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import HeaderComponent from '../../ui-components/header.component';
import AddCommentDialog from '../../form-components/comment-dialog.component';
import { updateProject, removeProject } from '../../../store/reducers/projects';
import DeleteConfirmDialog from '../../form-components/delete-dialog.component';
import { _projectsSorted } from '../../../store/selectors';
import { addFilter } from '../../../store/reducers/filters';

const ProjectsList = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectList = useSelector(_projectsSorted)

  const handleProjectCheckout = (projectId) => {
    console.log(projectId)
    dispatch(addFilter({
      year: [],
      status: '',
      projectId
    }))
    navigate(`/projects/dashboard/${projectId}`)
  }

  return <>
    <HeaderComponent
      title="Projects"
      buttons={[
        <Button component={Link} to="/projects/create" variant="contained"
          startIcon={<AddIcon />}
          key={1}
        >
          Add
        </Button>
      ]}
    />
    <Stack gap={2}>
      {
        projectList.map((project) => <Card key={project.id}>
          <CardContent
            onClick={() => handleProjectCheckout(project.id)}
          >
            <Typography gutterBottom variant="h6" component="div">
              {project.name}
            </Typography>
            <Stack>
            <Typography
                variant="body2"
                color="text.secondary"
              >
                {project.comment}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <AddCommentDialog doc={project} store="project" dispatcher={updateProject} />
              <Stack direction="row" justifyContent="end" gap={2}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/projects/edit/${project.id}`}
                >Edit</Button>
                <DeleteConfirmDialog
                  id={project.id}
                  store="project"
                  dispatcher={removeProject}
                  message="This will delete all records attached to the project"
                />
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Stack>
  </>
}

export default ProjectsList