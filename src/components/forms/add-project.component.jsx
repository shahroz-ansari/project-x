import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, CardContent, Stack } from "@mui/material";

import InputComponent from "../form-components/core/input.component"
import SwitchComponent from "../form-components/core/switch.component";

const AddProject = function ({ mode = 'add', project = null, onSubmit }) {
  const { formState: { errors }, reset, control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      status: true,
      comments: ''
    }
  });

  useEffect(() => {
    project && reset(project)
  }, [project, reset])

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Card>
      <CardContent>
      <Stack gap={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <InputComponent errors={errors} label="Project name" {...field} />}
          rules={{
            required: 'Project name is required field',
          }}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => <SwitchComponent onLabel="Active" offLabel="Inactive" {...field} />}
        />
        <Button type="submit" variant="contained">
          {mode === 'add' ? "Add" : "Update"}
        </Button>
      </Stack>
    </CardContent>
    </Card>
  </form>
}

export default AddProject