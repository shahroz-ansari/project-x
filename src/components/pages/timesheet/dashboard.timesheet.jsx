import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';

import HeaderComponent from "../../ui-components/header.component"
import TimelineComponent from "../../form-components/core/timeline.component";
import { _timesheetMonthHashTable, _projectsFiltered } from "../../../store/selectors";
import { generateDates } from "../../../helpers/timeline-generator";
import { Approved } from "../../../constants";
import { computeIconColor } from "../../../helpers/utils";


const TimesheetDashboard = function() {

  const dateGenerator = useRef(null)
  const [timelineItems, setTimelineItems] = useState([])

  const activeProjects = useSelector(_projectsFiltered)
  const timesheetMonthHashTable = useSelector(_timesheetMonthHashTable)

  const addTimesheetTimelineData = useCallback((timeline) => {
    const data = timeline.map((date) => {
      const icons = [];

      const projects = activeProjects.map((project) => {
        const projectTimesheet = timesheetMonthHashTable[project.id+date[0]+date[1]]

        if(projectTimesheet) {
          const clientColor = projectTimesheet.statusClient === Approved ? 'success' : 'warning'
          const selfColor = projectTimesheet.statusSelf === Approved ? 'success' : 'warning'
          
          let color;
          if(clientColor === selfColor) color = clientColor
          else color = 'warning'
          
          icons.push(color)
          

          return {
            id: projectTimesheet.id,
            projectId: project.id,
            name: project.name,
            comment: projectTimesheet.comment,
            clientIcon: clientColor,
            selfIcon: selfColor,
            path: `/timesheet/edit/${projectTimesheet.id}`
          }
        }

        return {
          projectId: project.id,
          name: project.name,
          comment: '',
          clientIcon: 'disabled',
          selfIcon: 'disabled',
          path: `/timesheet/create?projectId=${project.id}&month=${date[0]}&year=${date[1]}`
        }
      })

      return {
        text: `${date[0]}, ${date[1]}`,
        icon: computeIconColor(icons, activeProjects.length),
        projects
      }
    })

    setTimelineItems(d => ([...d, ...data]))
  }, [activeProjects, timesheetMonthHashTable])

  useEffect(() => {
    setTimelineItems([])
    dateGenerator.current = generateDates()
    addTimesheetTimelineData(dateGenerator.current.next().value)
  }, [addTimesheetTimelineData])

  const expandTimeline = () => {
    addTimesheetTimelineData(dateGenerator.current.next().value)
  }

  return <>
    <HeaderComponent title={'Timesheet timeline'}
      buttons={[
        <Button component={Link} to="/timesheet" variant="outlined"
          startIcon={<TimelineIcon />}
          key={1}
        >
          List
        </Button>,
        <Button component={Link} to="/timesheet/create" variant="contained"
          startIcon={<AddIcon />}
          key={2}
        >
          Add
        </Button>
      ]}
    />

    <TimelineComponent items={timelineItems} type="timesheet" onExpand={expandTimeline} />
  </>
}

export default TimesheetDashboard