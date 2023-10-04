import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { putRecord } from "../../../helpers/db/idb-query";
import AddMSA from '../../forms/add-msa.component';
import { updateMSA } from '../../../store/reducers/msa';
import { _msa } from '../../../store/selectors';

const MSAEdit = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    putRecord('msa', data, (doc) => {
      dispatch(updateMSA(doc))
      navigate(-1)
    })
  }

  const { msaId } = useParams();

  const msaList = useSelector(_msa)
  const msa = msaList.find(item => item.id === parseInt(msaId))

  return <>
    <HeaderComponent title="Edit MSA" />

    <AddMSA mode="edit" msa={msa} onSubmit={onSubmit} />
  </>
}

export default MSAEdit