import { useEffect } from "react";
import { getAllDocs } from "../db";
import { updateProjectsList } from "../store/reducers/projects";
import { updateMSAList } from "../store/reducers/msa";
import { updateSOWList } from "../store/reducers/sow";
import { updateTimesheetList } from "../store/reducers/timesheet";
import { updateInvoiceList } from "../store/reducers/invoice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const idbStores = ['project', 'msa', 'sow', 'timesheet', 'invoice']
const idbStoresDispatchers = [
  updateProjectsList,
  updateMSAList,
  updateSOWList,
  updateTimesheetList,
  updateInvoiceList
]
const IDBDataLoader = function() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function updateStore() {
      try {
        const idbStoresDocsPromisses = idbStores.map(s => getAllDocs(s))
        const idbStoresDocs = await Promise.all(idbStoresDocsPromisses)
        idbStoresDocs.map(
          (doc,index) => dispatch(idbStoresDispatchers[index](doc))
        )
      } catch(error) {
        toast.error('Something went worng')
      }
    }
    updateStore()
  }, [dispatch])

  return null
}

export default IDBDataLoader