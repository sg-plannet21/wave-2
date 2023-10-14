/*
const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name must be 20 characters or less')
    .trim(),
  timeRange: z
    .array(z.string(), {
      required_error: 'Time Range is required',
      invalid_type_error: 'Time Range is required',
    })
    .refine((val) => val[0] < val[1], {
      message: 'Start time must come before end time',
    }),
});
type FormValues = z.infer<typeof schema>;
*/

function Home() {
  return <h1>Home</h1>;
}

export default Home;
