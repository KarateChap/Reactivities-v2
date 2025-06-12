import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  closeForm: () => void;
  activity?: Activity;
  submitForm: (activity: Activity) => void;
};
const ActivityForm = ({ closeForm, activity, submitForm }: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) data.id = activity.id;

    console.log(data);
    submitForm(data as unknown as Activity);
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
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
          defaultValue={activity?.date}
        />
        <TextField label="City" name="city" defaultValue={activity?.city} />
        <TextField label="Venue" name="venue" defaultValue={activity?.venue} />
        <Box
          display="flex"
          justifyContent="end"
          gap={3}
          defaultValue={activity?.title}
        >
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default ActivityForm;
