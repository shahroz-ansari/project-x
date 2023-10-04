import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Pending } from '../../constants';

const StatusBadge = function({ status, label = '', color }) {

  return <Chip
    color={color || (status === Pending ? "warning" : "success")}
    size="small"
    icon={
      (color && color === 'warning') || status === Pending
        ? <AccessTimeIcon />
        : <CheckCircleIcon />
    }
    label={label || status}
  />
}

export default StatusBadge