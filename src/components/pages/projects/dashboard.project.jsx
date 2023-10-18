import {useState, useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HeaderComponent from '../../ui-components/header.component';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';
import TimesheetDashboard from '../timesheet/dashboard.timesheet';
import InvoiceDashboard from '../invoice/dashboard.invoice';
import { useSelector } from 'react-redux';
import { _ProjectHashTable, _filters } from '../../../store/selectors';
import SOWList from '../sow/list.sow';
import MSAList from '../msa/list.msa';

const tabs = ['#timesheet', '#invoice', '#sow', '#msa']
function TabPanel(props) {
  const { children, value, selected, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selected}
      id={`full-width-tabpanel-${selected}`}
      aria-labelledby={`full-width-tab-${selected}`}
      {...other}
    >
      {value === selected && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function DashboardProject() {
  const {hash, pathname} = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('#timesheet');

  const handleChangeIndex = (hash) => {
    navigate(pathname+tabs[hash])
  };

  const projectHashTable = useSelector(_ProjectHashTable)
  const filters = useSelector(_filters)

  useEffect(() => {
    hash && setValue(hash)
  }, [hash])

  return (<>
  <HeaderComponent
      title={projectHashTable?.[filters.projectId]?.name}
      buttons={[
        <Button component={Link} to="/projects" variant="outlined"
          startIcon={<TimelineIcon />}
          key={1}
        >
          List
        </Button>,
        <Button component={Link} to="/projects/create" variant="contained"
          startIcon={<AddIcon />}
          key={2}
        >
          Add
        </Button>
      ]}
    />
    <Box sx={{minHeight: 'calc(100vh - 152px)'}}>
      <Tabs
        value={value}
        textColor="secondary"
        indicatorColor='secondary'
        centered
      >
        <Tab href='#timesheet' value={'#timesheet'} sx={{minWidth: 'unset'}} label="Timesheet" />
        <Tab href='#invoice' value={'#invoice'} sx={{minWidth: 'unset'}} label="Invoice" />
        <Tab href='#sow' value={'#sow'} sx={{minWidth: 'unset'}} label="SOW" />
        <Tab href='#msa' value={'#msa'} sx={{minWidth: 'unset'}} label="MSA" />
      </Tabs>
      <SwipeableViews
        index={tabs.indexOf(value)}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={'#timesheet'} selected={value}>
          <TimesheetDashboard showHeader={false} />
        </TabPanel>
        <TabPanel value={'#invoice'} selected={value}>
          <InvoiceDashboard showHeader={false} />
        </TabPanel>
        <TabPanel value={'#sow'} selected={value}>
          <SOWList showHeader={false}/>
        </TabPanel>
        <TabPanel value={'#msa'} selected={value}>
          <MSAList showHeader={false}/>
        </TabPanel>
      </SwipeableViews>
    </Box>
    </>
  );
}
