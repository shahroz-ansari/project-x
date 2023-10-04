import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { addRecord } from "../../../helpers/db/idb-query";
import AddInvoice from '../../forms/add-invoice.component';
import { addInvoice } from '../../../store/reducers/invoice';

const InvoiceCreate = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')
  const month = searchParams.get('month')
  const year = searchParams.get('year')

  const onSubmit = async (data) => {
    addRecord('invoice', data, (doc) => {
      dispatch(addInvoice(doc))
      navigate(-1)
    })
  }

  return <>
    <HeaderComponent title="Add new Invoice" />

    <AddInvoice onSubmit={onSubmit} projectId={projectId} month={month} year={year} />
  </>
}

export default InvoiceCreate