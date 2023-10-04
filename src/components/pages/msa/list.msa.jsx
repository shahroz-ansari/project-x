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
import DeleteConfirmDialog from '../../form-components/delete-dialog.component';
import { _ProjectHashTable, _msaFiltered } from '../../../store/selectors';
import { removeMSA, updateMSA } from '../../../store/reducers/msa';
import StatusBadge from '../../form-components/status-badge.component';

const MSAList = function() {

  const msaList = useSelector(_msaFiltered)
  const projectHashTable = useSelector(_ProjectHashTable)

  return <>
    <HeaderComponent
      title="MSAs"
      buttons={[
        <Button component={Link} to="/msa/create" variant="contained"
          startIcon={<AddIcon />}
          key={1}
        >
          Add
        </Button>
      ]}
    />
    <Stack gap={2}>
      {
        msaList.map((msa) => <Card key={msa.id}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h6" component="div">
                {msa.fromYear} - {msa.toYear}
              </Typography>
              <StatusBadge status={msa.status} />
            </Stack>
            <Typography gutterBottom component="div">
              {projectHashTable[msa.projectId].name}
            </Typography>
            <Stack>
            <Typography
                variant="body2"
                color="text.secondary"
              >
                {msa.comment}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <AddCommentDialog doc={msa} store="msa" dispatcher={updateMSA} />
              <Stack direction="row" justifyContent="end" gap={2}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/msa/edit/${msa.id}`}
                >Edit</Button>
                <DeleteConfirmDialog
                  id={msa.id}
                  store="msa"
                  dispatcher={removeMSA}
                  message="You want to delete MSA?"
                />
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Stack>
  </>
}

export default MSAList