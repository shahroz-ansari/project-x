import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material"
import ProjectSelector from "./project-selector.component"
import Multiselect from "./core/multiselect.component"
import { Controller, useForm } from "react-hook-form";
import { Status, Years } from "../../constants";
import generateSelectList from "../../helpers/generate-select-list";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../store/reducers/filters";
import CloseIcon from '@mui/icons-material/Close';
import { _filters, _isFilterActive } from "../../store/selectors";
import StatusSelector from "./status-selector.component";

const Filter = function({closeDrawer}) {
  const dispatch = useDispatch()
  const filters = useSelector(_filters)
  const isFilterActive = useSelector(_isFilterActive)

  const { formState: { errors }, reset, control, handleSubmit } = useForm({
    defaultValues: filters
  });

  const onApply = (data) => {
    dispatch(addFilter(data))
    closeDrawer()
  }

  const onClear = () => {
    dispatch(removeFilter())
    reset({
      projectId: '',
      year: [],
      status: ''
    })
    closeDrawer()
  }

  return <Box sx={{p: 3, pt: 2}}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 3}}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      <IconButton aria-label="close" onClick={closeDrawer}>
        <CloseIcon />
      </IconButton>
    </Stack>
      
    <form onSubmit={handleSubmit(onApply)}>
      <Stack gap={3}>
        <Controller
            name="projectId"
            control={control}
            render={({ field }) => <ProjectSelector
              errors={errors}
              label="Project"
              size="large"
              {...field}
            />}
          />
        <Controller
            name="year"
            control={control}
            render={({ field }) => <Multiselect
              fullWidth
              selectList={generateSelectList(Years)}
              errors={errors}
              label="Year"
              size="large"
              {...field}
            />}
          />
        <Controller
            name="status"
            control={control}
            render={({ field }) => <StatusSelector
              fullWidth
              selectList={generateSelectList(Status)}
              errors={errors}
              label="Status"
              size="large"
              {...field}
            />}
          />
      </Stack>
      <Divider sx={{my: 2}} />
      <Stack gap={2} direction="row" justifyContent="end">
        {isFilterActive && <Button variant="text" color="error" onClick={onClear}>Reset</Button>}
        <Button type="submit" variant="contained">Apply</Button>
      </Stack>
    </form>
  </Box>
}

export default Filter