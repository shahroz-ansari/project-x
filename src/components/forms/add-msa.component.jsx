import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, CardContent, Grid, Stack } from "@mui/material";

import ProjectSelector from "../form-components/project-selector.component";
import YearSelector from "../form-components/year-selector.component";
import StatusSelector from "../form-components/status-selector.component";

const AddMSA = function ({ mode = 'add', msa = null, onSubmit, projectId }) {
  const { formState: { errors }, reset, control, handleSubmit } = useForm({
    defaultValues: {
      projectId: projectId || '',
      fromYear: '',
      toYear: '',
      status: '',
      comments: ''
    }
  });

  useEffect(() => {
    msa && reset(msa)
  }, [msa, reset])

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
              name="fromYear"
              control={control}
              render={({ field }) => <YearSelector errors={errors} label="From year" {...field} />}
              rules={{
                required: 'From year is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
          <Controller
              name="toYear"
              control={control}
              render={({ field }) => <YearSelector fullWidth errors={errors} label="To year" {...field} />}
              rules={{
                required: 'To year is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
          <Controller
              name="status"
              control={control}
              render={({ field }) => <StatusSelector errors={errors} label="Status" {...field} />}
              rules={{
                required: 'Status is required field',
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

export default AddMSA