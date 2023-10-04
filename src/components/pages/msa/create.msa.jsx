import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { addRecord } from "../../../helpers/db/idb-query";
import AddMSA from '../../forms/add-msa.component';
import { addMSA } from '../../../store/reducers/msa';

const MSACreate = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')

  const onSubmit = async (data) => {
    addRecord('msa', data, (doc) => {
      dispatch(addMSA(doc))
      navigate(-1)
    })
  }

  return <>
    <HeaderComponent title="Add new MSA" />

    <AddMSA onSubmit={onSubmit} projectId={projectId} />
  </>
}

export default MSACreate