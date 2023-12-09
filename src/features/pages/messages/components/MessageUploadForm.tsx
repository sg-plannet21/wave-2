import Form, { useZodForm } from '@/components/Form/Form';
import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import { useFieldArray } from 'react-hook-form';
import { useCallback } from 'react';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import FileUpload from './FileUpload';
import { UploadFormValues, messageUploadSchema } from '../types/schema';

function removeExtension(value: string) {
  return value.replace(/\.[^/.]+$/, '');
}

interface Props {
  onSubmit: (values: UploadFormValues) => void;
  isSubmitting: boolean;
}

function MessageUploadForm({ onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof messageUploadSchema>({
    schema: messageUploadSchema,
    defaultValues: {
      files: [],
    },
  });

  const { fields, replace, remove } = useFieldArray({
    control: form.control,
    name: 'files',
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mappedFiles: Array<{ file: File; name: string }> =
        acceptedFiles.map((file) => ({
          file,
          name: removeExtension(file.name),
        }));
      replace(mappedFiles);
    },
    [replace]
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form form={form} onSubmit={onSubmit} className="my-4 space-y-3">
        <FileUpload onDrop={handleDrop} />

        {fields.map((field, index) => (
          <section key={field.id}>
            <div className="my-1 flex items-end space-x-2">
              <div className="flex-1">
                <InputField
                  {...form.register(`files.${index}.name`)}
                  label={`Message ${index + 1} Name`}
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 text-red-600 dark:text-red-400 transition-transform hover:scale-110 outline-none focus:outline-none"
              >
                <DeleteIcon className="w-7 h-7 fill-current" />
              </button>
            </div>
            <div className="mt-1 text-sm font-semibold text-red-600 dark:text-red-500">
              {form.formState.errors.files?.[index]?.name?.message}
            </div>
          </section>
        ))}
        <div className="text-red-500">
          {form.formState.errors.files?.message}
        </div>
        {fields.length > 0 && (
          <div>
            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
              className="w-full"
            >
              Upload {fields.length > 1 ? 'Messages' : 'Message'}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default MessageUploadForm;
