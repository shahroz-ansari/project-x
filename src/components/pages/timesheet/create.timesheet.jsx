import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { addRecord } from "../../../helpers/db/idb-query";
import AddTimesheet from '../../forms/add-timesheet.component';
import { addTimesheet } from '../../../store/reducers/timesheet';

const TimesheetCreate = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')
  const month = searchParams.get('month')
  const year = searchParams.get('year')

  const onSubmit = async (data) => {
    addRecord('timesheet', data, (doc) => {
      dispatch(addTimesheet(doc))
      navigate(-1)
    })
  }

  return <>
    <HeaderComponent title="Add new Timesheet" />

    <AddTimesheet onSubmit={onSubmit} projectId={projectId} month={month} year={year} />
  </>
}

export default TimesheetCreate