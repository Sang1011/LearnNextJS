/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormHelperText, Typography } from "@mui/material";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

export type EditorFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<any>;
};

export function EditorField<T extends FieldValues>({
  name,
  label,
  control,
}: EditorFieldProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkFileSize = (file: Blob) => {
    const maxSize = 3 * 1024 * 1024; 
    if (file.size > maxSize) {
      return false;
    }
    return true;
  };
  return (
    <Box sx={{ my: 1.5 }}>
      <Typography variant="body2">{label}</Typography>

      <Box>
      {isClient && (
          <Editor
          value={value || ""}
          onEditorChange={(content) => onChange(content)}
          apiKey="g78f7q7nisjzjjlapkhzc7a4d8sqlc88uhr237r6dj4yvifj"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            placeholder: "Enter full description...",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            images_upload_handler: async (blobInfo: any, success?: any, failure?: any): Promise<string> => {
              return new Promise(async (resolve, reject) => {
                try {
                  // Kiểm tra kích thước file trước khi tải lên
                  if (!checkFileSize(blobInfo.blob())) {
                    if (failure) failure("File size exceeds 3MB.");
                    reject("File size exceeds 3MB.");
                    return;
                  }

                  const formData = new FormData();
                  formData.append("file", blobInfo.blob()); // Blob từ TinyMCE
                  formData.append("upload_preset", "My_project_NextJS"); // Cloudinary preset
                  formData.append("cloud_name", "dfrn7ujle"); // Tên Cloudinary của bạn

                  // Gửi request đến Cloudinary
                  const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dfrn7ujle/image/upload`,
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  const data = await response.json();

                  if (response.ok) {
                    if (success) {
                      success(data.secure_url); 
                    }
                    resolve(data.secure_url)
                  } else {
                    if (failure) {
                      failure("Upload failed: " + data.error.message);
                    }
                    reject("Upload failed: " + data.error.message); // Xử lý lỗi
                  }
                } catch (error: any) {
                  if (failure) {
                    failure("Error uploading image: " + error.message);
                  }
                  reject("Error uploading image: " + error.message); // Xử lý lỗi
                }
              });
            },
            automatic_uploads: true,
            directionality: 'ltr',
            exportpdf_converter_options: {
              format: "Letter",
              margin_top: "1in",
              margin_right: "1in",
              margin_bottom: "1in",
              margin_left: "1in",
            },
            exportword_converter_options: {
              document: { size: "Letter" },
            },
            importword_converter_options: {
              formatting: {
                styles: "inline",
                resets: "inline",
                defaults: "inline",
              },
            },
          }}
        />
        
        
        )}
      </Box>

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  );
}
