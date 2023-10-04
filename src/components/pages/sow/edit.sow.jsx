import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { putRecord } from "../../../helpers/db/idb-query";
import AddSOW from '../../forms/add-sow.component';
import { updateSOW } from '../../../store/reducers/sow';
import { _sow } from '../../../store/selectors';

const SOWEdit = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    putRecord('sow', data, (doc) => {
      dispatch(updateSOW(doc))
      navigate(-1)
    })
  }

  const { sowId } = useParams();

  const sowList = useSelector(_sow)
  const sow = sowList.find(item => item.id === parseInt(sowId))

  return <>
    <HeaderComponent title="Edit SOW" />

    <AddSOW mode="edit" sow={sow} onSubmit={onSubmit} />
  </>
}

export default SOWEdit