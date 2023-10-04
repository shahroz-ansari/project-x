import { ButtonGroup, Stack, Typography } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

const HeaderComponent = function({title, buttons, showBackIcon = false}) {
  const navigate = useNavigate()
  return <Stack gap={2} direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 3}}>
    <Stack direction="row" gap={1} alignItems="center">
      {showBackIcon && <ArrowBackIosNewIcon color="primary" onClick={() => navigate(-1)} />}
      <Typography variant="h5">{title}</Typography>
    </Stack>
    <ButtonGroup disableElevation size="small" variant="contained" aria-label="small button group">
      {buttons}
    </ButtonGroup>
  </Stack>
}

export default HeaderComponent