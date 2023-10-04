import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const icons = {
  'success': CheckCircleIcon,
  'warning': AccessTimeIcon,
  'disabled': AccessTimeIcon,
}

const StatusIcon = function({ color = 'disabled' }) {
  const Icon = icons[color]
  return <Icon color={color} />
}

export default StatusIcon