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
import { _ProjectHashTable, _timesheetFiltered } from '../../../store/selectors';
import { removeTimesheet, updateTimesheet } from '../../../store/reducers/timesheet';
import StatusBadge from '../../form-components/status-badge.component';
import { Pending } from '../../../constants';
import TimelineIcon from '@mui/icons-material/Timeline';

const TimesheetList = function() {

  const timesheetList = useSelector(_timesheetFiltered)
  const projectHashTable = useSelector(_ProjectHashTable)

  return <>
    <HeaderComponent
      title="Timesheets"
      buttons={[
        <Button component={Link} to="/timesheet/dashboard" variant="outlined"
          startIcon={<TimelineIcon />}
          key={1}
        >
          Timeline
        </Button>,
        <Button component={Link} to="/timesheet/create" variant="contained"
          startIcon={<AddIcon />}
          key={2}
        >
          Add
        </Button>
      ]}
    />
    <Stack gap={2}>
      {
        timesheetList.map((timesheet) => <Card key={timesheet.id}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h6" component="div">
                {timesheet.month}, {timesheet.year}
              </Typography>
              <Stack gap={2} direction="row">
                <StatusBadge status={'Client'} color={timesheet.statusClient === Pending ? 'warning' : 'success'} />
                <StatusBadge status={'Self'} color={timesheet.statusSelf === Pending ? 'warning' : 'success'}/>
              </Stack>
            </Stack>
            <Typography gutterBottom component="div">
              {projectHashTable[timesheet.projectId].name}
            </Typography>
            <Stack>
            <Typography
                variant="body2"
                color="text.secondary"
              >
                {timesheet.comment}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <AddCommentDialog doc={timesheet} store="timesheet" dispatcher={updateTimesheet} />
              <Stack direction="row" justifyContent="end" gap={2}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/timesheet/edit/${timesheet.id}`}
                >Edit</Button>
                <DeleteConfirmDialog
                  id={timesheet.id}
                  store="timesheet"
                  dispatcher={removeTimesheet}
                  message="You want to delete Timesheet?"
                />
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Stack>
  </>
}

export default TimesheetList