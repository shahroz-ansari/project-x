import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { addRecord } from "../../../helpers/db/idb-query";
import { addSOW } from '../../../store/reducers/sow';
import AddSOW from '../../forms/add-sow.component';

const SOWCreate = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')

  const onSubmit = async (data) => {
    addRecord('sow', data, (doc) => {
      dispatch(addSOW(doc))
      navigate(-1)
    })
  }

  return <>
    <HeaderComponent title="Add new SOW" />

    <AddSOW onSubmit={onSubmit} projectId={projectId} />
  </>
}

export default SOWCreate