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
import { _ProjectHashTable, _sowFiltered } from '../../../store/selectors';
import { removeSOW, updateSOW } from '../../../store/reducers/sow';
import StatusBadge from '../../form-components/status-badge.component';

const SOWList = function({showHeader = true}) {

  const sowList = useSelector(_sowFiltered)
  const projectHashTable = useSelector(_ProjectHashTable)

  return <>
    {showHeader && <HeaderComponent
      title="SOWs"
      buttons={[
        <Button component={Link} to="/sow/create" variant="contained"
          startIcon={<AddIcon />}
          key={1}
        >
          Add
        </Button>
      ]}
    />}
    <Stack gap={2}>
      {
        sowList.map((sow) => <Card key={sow.id}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div">
                {sow.fromMonth} - {sow.toMonth}
                <Typography variant="caption" component="span" sx={{ml: 1}}>
                  ({sow.fromYear} - {sow.toYear})
                </Typography>
              </Typography>
              <StatusBadge status={sow.status} />
            </Stack>
            <Typography gutterBottom component="div">
              {projectHashTable[sow.projectId].name}
            </Typography>
            <Stack>
            <Typography
                variant="body2"
                color="text.secondary"
              >
                {sow.comment}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <AddCommentDialog doc={sow} store="sow" dispatcher={updateSOW} />
              <Stack direction="row" justifyContent="end" gap={2}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/sow/edit/${sow.id}`}
                >Edit</Button>
                <DeleteConfirmDialog
                  id={sow.id}
                  store="sow"
                  dispatcher={removeSOW}
                  message="You want to delete SOW?"
                />
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Stack>
  </>
}

export default SOWList