import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { MainLayout } from "@/src/components/layout";
import { useAddWork, useWorkDetail } from "@/hooks";
import { WorkForm } from "@/src/components/work/work-form";
import Script from "next/script";
import { toast } from "react-toastify";

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId?.toString().toLowerCase() === "add";

  const {
    data: workDetails,
    isLoading,
    updateWork,
  } = useWorkDetail({
    workId: workId as string,
    enabled: router.isReady && !isAddMode,
  });

  const addNewWork = useAddWork();

  async function handleSubmitForm(payload: FormData) {
    try {
      if (isAddMode) {
        const newWork = await addNewWork(payload);
        await toast.success(`Add work successfully, ${newWork?.id}`);
        router.push(`/works/${newWork?.id}/details`)
      } else {
        await updateWork(payload);
        toast.success("Update work successfully");
      }
    } catch (error) {
      if (isAddMode) {
        toast.error("Failed to add work");
      } else toast.error("Failed to update work");
    }
  }

  return (
    <Box>
      <Container>
        <Box>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Box mb={4} mt={8}>
                <Typography component="h1" variant="h3" fontWeight="bold">
                  {isAddMode ? `Add new work` : `Edit work #${workId}`}
                </Typography>
              </Box>
              <Box>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit,
                consectetur accusantium perferendis neque temporibus error earum
                voluptas hic sint tenetur eius molestias, veritatis velit amet
                suscipit. Ut consectetur harum nostrum?
              </Box>
              {Boolean(workDetails) && (
                <WorkForm
                  initialValues={workDetails}
                  onSubmit={handleSubmitForm}
                />
              )}
            </>
          )}
        </Box>
      </Container>

      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="afterInteractive"
      />
    </Box>
  );
}

AddEditWorkPage.Layout = MainLayout;
