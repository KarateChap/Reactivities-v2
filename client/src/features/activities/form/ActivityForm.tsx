import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

const ActivityForm = () => {
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`manage/${activity.id}`);
    } else {
      await createActivity.mutate(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        },
      });
    }
  };

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit activity" : "Create activity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField label="Title" name="title" defaultValue={activity?.title} />
        <TextField
          label="Description"
          multiline={true}
          rows={3}
          name="description"
          defaultValue={activity?.description}
        />
        <TextField
          label="Category"
          name="category"
          defaultValue={activity?.category}
        />
        <TextField
          label="Date"
          type="date"
          name="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        />
        <TextField label="City" name="city" defaultValue={activity?.city} />
        <TextField label="Venue" name="venue" defaultValue={activity?.venue} />
        <Box
          display="flex"
          justifyContent="end"
          gap={3}
          defaultValue={activity?.title}
        >
          <Button color="inherit">Cancel</Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default ActivityForm;
