import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { putRecord } from "../../../helpers/db/idb-query";
import AddTimesheet from '../../forms/add-timesheet.component';
import { updateTimesheet } from '../../../store/reducers/timesheet';
import { _timesheet } from '../../../store/selectors';

const TimesheetEdit = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    putRecord('timesheet', data, (doc) => {
      dispatch(updateTimesheet(doc))
      navigate(-1)
    })
  }

  const { timesheetId } = useParams();

  const timesheetList = useSelector(_timesheet)
  const timesheet = timesheetList.find(item => item.id === parseInt(timesheetId))

  return <>
    <HeaderComponent title="Edit Timesheet" />

    <AddTimesheet mode="edit" timesheet={timesheet} onSubmit={onSubmit} />
  </>
}

export default TimesheetEdit