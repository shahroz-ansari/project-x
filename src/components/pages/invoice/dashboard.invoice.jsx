import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';

import HeaderComponent from "../../ui-components/header.component"
import TimelineComponent from "../../form-components/core/timeline.component";
import { _invoiceMonthHashTable, _projectsFiltered } from "../../../store/selectors";
import { generateDates } from "../../../helpers/timeline-generator";
import { Approved } from "../../../constants";
import { computeIconColor } from "../../../helpers/utils";


const InvoiceDashboard = function() {

  const dateGenerator = useRef(null)
  const [timelineItems, setTimelineItems] = useState([])

  const activeProjects = useSelector(_projectsFiltered)
  const invoiceMonthHashTable = useSelector(_invoiceMonthHashTable)

  const addInvoiceTimelineData = useCallback((timeline) => {
    const data = timeline.map((date) => {
      const icons = [];

      const projects = activeProjects.map((project) => {
        const projectInvoice = invoiceMonthHashTable[project.id+date[0]+date[1]]

        if(projectInvoice) {
          const color = projectInvoice.status === Approved ? 'success' : 'warning'
          icons.push(color)

          return {
            id: projectInvoice.id,
            projectId: project.id,
            name: project.name,
            comment: projectInvoice.comment,
            icon: color,
            sent: projectInvoice.sent,
            path: `/invoice/edit/${projectInvoice.id}`
          }
        }

        return {
          projectId: project.id,
          name: project.name,
          comment: '',
          icon: 'disabled',
          path: `/invoice/create?projectId=${project.id}&month=${date[0]}&year=${date[1]}`
        }
      })

      return {
        text: `${date[0]}, ${date[1]}`,
        icon: computeIconColor(icons, activeProjects.length),
        projects
      }
    })

    setTimelineItems(d => ([...d, ...data]))
  }, [activeProjects, invoiceMonthHashTable])

  useEffect(() => {
    setTimelineItems([])
    dateGenerator.current = generateDates()
    addInvoiceTimelineData(dateGenerator.current.next().value)
  }, [addInvoiceTimelineData])

  const expandTimeline = () => {
    addInvoiceTimelineData(dateGenerator.current.next().value)
  }

  return <>
    <HeaderComponent title={'Invoice timeline'}
      buttons={[
        <Button component={Link} to="/invoice" variant="outlined"
          startIcon={<TimelineIcon />}
          key={1}
        >
          List
        </Button>,
        <Button component={Link} to="/invoice/create" variant="contained"
          startIcon={<AddIcon />}
          key={2}
        >
          Add
        </Button>
      ]}
    />

    <TimelineComponent items={timelineItems} type="invoice" onExpand={expandTimeline} />
  </>
}

export default InvoiceDashboard