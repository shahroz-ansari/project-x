import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Fragment, forwardRef } from 'react';
import StatusIcon from '../status-icon.component';
import { useNavigate } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const timelineIcon = {
  'success': DoneIcon,
  'warning': AccessTimeIcon,
  'grey': AccessTimeIcon,
}

const TimelineComponent = function({items, type, onExpand}, ref) {
  const navigate = useNavigate()

  return <>
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
        p: 0
      }}
      ref={ref}
    >
      {
        items.map((item, itemIndex) => {
          const DotIcon = timelineIcon[item.icon]

          return <TimelineItem key={itemIndex}>
            <TimelineOppositeContent color="textSecondary">
              {item.text}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={item.icon}>
                <DotIcon />
              </TimelineDot>
              {items[itemIndex + 1] && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Stack gap={1} sx={{my: 2}}>
                {
                  item.projects.map(( project, projectIndex ) => {
                    return <Fragment key={projectIndex}>
                      <Stack
                        onClick={() => navigate(project.path)}
                      >
                        <Stack gap={1} direction="row" alignItems="center">
                          {
                            type === 'timesheet'
                              ?
                                <>
                                  <StatusIcon color={project.selfIcon} />
                                  <StatusIcon color={project.clientIcon} />
                                </>
                              : <StatusIcon color={project.icon} /> 
                          }
                          <Typography variant="subtitle2" component="div">
                            {project.name}
                          </Typography>
                          {
                            type === 'invoice' && (
                              project.icon !== 'success'
                                ? <DoneAllIcon color={'disabled'} />
                                : project.sent
                                  ? <DoneAllIcon color={'success'} />
                                  : <WarningIcon color={'error'} />)
                          }
                        </Stack>
                        <Typography variant="caption" component="div">
                          {project.comment}
                        </Typography>
                      </Stack>
                      { item.projects[projectIndex + 1] && <Divider /> }
                    </Fragment>
                  })
                }
              </Stack>
            </TimelineContent>
          </TimelineItem>
        })
      }
    </Timeline>
    <Stack alignItems="center">
      <IconButton onClick={onExpand}>
        <ExpandCircleDownIcon fontSize='large' color="secondary" />
      </IconButton>
    </Stack>
  </>
}

export default forwardRef(TimelineComponent)