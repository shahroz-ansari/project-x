import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "../../ui-components/header.component"
import { putRecord } from "../../../helpers/db/idb-query";
import AddInvoice from '../../forms/add-invoice.component';
import { updateInvoice } from '../../../store/reducers/invoice';
import { _invoice } from '../../../store/selectors';

const InvoiceEdit = function() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    putRecord('invoice', data, (doc) => {
      dispatch(updateInvoice(doc))
      navigate(-1)
    })
  }

  const { invoiceId } = useParams();

  const invoiceList = useSelector(_invoice)
  const invoice = invoiceList.find(item => item.id === parseInt(invoiceId))

  return <>
    <HeaderComponent title="Edit Invoice" />

    <AddInvoice mode="edit" invoice={invoice} onSubmit={onSubmit} />
  </>
}

export default InvoiceEdit