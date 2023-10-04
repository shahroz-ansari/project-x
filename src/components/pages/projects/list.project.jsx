import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

const ProjectsList = function() {

  const projectList = useSelector(_projectsSorted)

  return <>
    <HeaderComponent
      title="Projects"
      buttons={[
        <Button component={Link} to="/projects/create" variant="contained"
          startIcon={<AddIcon />}
          key={1}
        >
          Add new
        </Button>
      ]}
    />
    <Stack gap={2}>
      {
        projectList.map((project) => <Card key={project.id}>
          <CardContent>
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