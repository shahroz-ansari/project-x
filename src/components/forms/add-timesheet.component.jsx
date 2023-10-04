import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, CardContent, Grid, Stack } from "@mui/material";

import ProjectSelector from "../form-components/project-selector.component";
import YearSelector from "../form-components/year-selector.component";
import StatusSelector from "../form-components/status-selector.component";
import MonthSelector from "../form-components/month-selector.component";

const AddTimesheet = function ({
  mode = 'add',
  timesheet = null,
  onSubmit,
  projectId,
  month,
  year
}) {
  const { formState: { errors }, reset, control, handleSubmit } = useForm({
    defaultValues: {
      projectId: projectId || '',
      year: year || '',
      month: month || '',
      statusSelf: '',
      statusClient: '',
      comments: ''
    }
  });

  useEffect(() => {
    timesheet && reset(timesheet)
  }, [timesheet, reset])

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Card>
      <CardContent>
        <Stack gap={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="projectId"
              control={control}
              render={({ field }) => <ProjectSelector
                errors={errors}
                label="Project"
                {...field}
              />}
              rules={{
                required: 'Project is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="month"
              control={control}
              render={({ field }) => <MonthSelector errors={errors} {...field} />}
              rules={{
                required: 'Month is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="year"
              control={control}
              render={({ field }) => <YearSelector errors={errors} {...field} />}
              rules={{
                required: 'Year is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="statusClient"
              control={control}
              render={({ field }) => <StatusSelector errors={errors} label="Status client" {...field} />}
              rules={{
                required: 'Status client is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
          <Controller
              name="statusSelf"
              control={control}
              render={({ field }) => <StatusSelector errors={errors} label="Status self" {...field} />}
              rules={{
                required: 'Status self is required field',
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          {mode === 'add' ? "Add" : "Update"}
        </Button>
        </Stack>
      </CardContent>
    </Card>
  </form>
}

export default AddTimesheet