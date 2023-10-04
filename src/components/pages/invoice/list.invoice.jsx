import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Stack,
  Card,
  CardActions,
  CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';
import HeaderComponent from '../../ui-components/header.component';
import AddCommentDialog from '../../form-components/comment-dialog.component';
import DeleteConfirmDialog from '../../form-components/delete-dialog.component';
import { _ProjectHashTable, _invoiceFiltered } from '../../../store/selectors';
import { removeInvoice, updateInvoice } from '../../../store/reducers/invoice';
import StatusBadge from '../../form-components/status-badge.component';

const InvoiceList = function() {

  const invoiceList = useSelector(_invoiceFiltered)
  const projectHashTable = useSelector(_ProjectHashTable)

  return <>
    <HeaderComponent
      title="Invoices"
      buttons={[
        <Button component={Link} to="/invoice/dashboard" variant="outlined"
          startIcon={<TimelineIcon />}
          key={1}
        >
          Timeline
        </Button>,
        <Button component={Link} to="/invoice/create" variant="contained"
          startIcon={<AddIcon />}
          key={2}
        >
          Add
        </Button>
      ]}
    />
    <Stack gap={2}>
      {
        invoiceList.map((invoice) => <Card key={invoice.id}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" sx={{mb: 2}}>
              <Stack gap={1}>
                <Typography variant="h6" component="div">
                  {invoice.month} - {invoice.year}
                </Typography>
                <Typography component="div">
                  {projectHashTable[invoice.projectId].name}
                </Typography>
              </Stack>
              <Stack gap={1}>
                <StatusBadge
                  status={invoice.sent ? 'Sent' : 'Pending to be sent'}
                  color={invoice.sent ? 'success' : 'warning'}
                />
                <StatusBadge status={invoice.status} />
              </Stack>
            </Stack>
            <Stack>
            <Typography
                variant="body2"
                color="text.secondary"
              >
                {invoice.comment}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <AddCommentDialog doc={invoice} store="invoice" dispatcher={updateInvoice} />
              <Stack direction="row" justifyContent="end" gap={2}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/invoice/edit/${invoice.id}`}
                >Edit</Button>
                <DeleteConfirmDialog
                  id={invoice.id}
                  store="invoice"
                  dispatcher={removeInvoice}
                  message="You want to delete Invoice?"
                />
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Stack>
  </>
}

export default InvoiceList