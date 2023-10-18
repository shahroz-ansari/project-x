import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, CardContent, Grid, Stack } from "@mui/material";

import ProjectSelector from "../form-components/project-selector.component";
import YearSelector from "../form-components/year-selector.component";
import StatusSelector from "../form-components/status-selector.component";
import SwitchComponent from "../form-components/core/switch.component";
import MonthSelector from "../form-components/month-selector.component";
import { Pending, Approved } from "../../constants";

const AddInvoice = function ({
  mode = 'add',
  invoice = null,
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
      status: '',
      sent: false,
      comments: ''
    }
  });

  useEffect(() => {
    invoice && reset(invoice)
  }, [invoice, reset])

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
              render={({ field }) => <MonthSelector fullWidth errors={errors} label="Month" {...field} />}
              rules={{
                required: 'Month is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="year"
              control={control}
              render={({ field }) => <YearSelector errors={errors} label="Year" {...field} />}
              rules={{
                required: 'Year is required field',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="status"
              control={control}
              render={
                ({ field }) => <StatusSelector 
                  errors={errors}
                  label="Status"
                  list={[{label: Pending, value: Pending}, {label: 'Sent', value: Approved}]}
                  {...field}
                />
              }
              rules={{
                required: 'Status is required field',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sent"
              control={control}
              render={({ field }) => <SwitchComponent onLabel="Approved" offLabel="Approval Pending" {...field} />}
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

export default AddInvoice