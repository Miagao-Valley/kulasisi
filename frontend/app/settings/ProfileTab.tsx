import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@/types/users';
import updateUser from '@/lib/users/updateUser';
import setFormErrors from '@/utils/setFormErrors';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingButton } from '@/components/ui/loading-button';
import { Textarea } from '@/components/ui/textarea';

export interface ProfileInputs {
  username: string;
  password: string;
  email: string;
  phone_number: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  location: string;
  gender: string;
  bio: string;
  website: string;
}

interface Props {
  user: User;
}

export default function ProfileTab({ user }: Props) {
  const form = useForm<ProfileInputs>();
  const onSubmit: SubmitHandler<ProfileInputs> = async (
    data: ProfileInputs,
  ) => {
    const res = await updateUser(user.username, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    }
    return res;
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2>General</h2>

          <FormMessage>
            {form.formState.errors.root?.serverError.message}
          </FormMessage>

          <div>
            <h3 className="text-base">Name</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="first_name"
                defaultValue={user.first_name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FloatingLabelInput
                        label="First Name"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                defaultValue={user.last_name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FloatingLabelInput label="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="text-base">Birthdate</h3>
            <FormField
              control={form.control}
              name="date_of_birth"
              defaultValue={user.date_of_birth}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      granularity="day"
                      placeholder="What's your birthday?"
                      displayFormat={{ hour24: 'PPP', hour12: 'PP' }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-base">Location</h3>
            <FormField
              control={form.control}
              name="location"
              defaultValue={user.location}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput label="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-base">Gender</h3>
            <FormField
              control={form.control}
              name="gender"
              defaultValue={user.gender}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Other</SelectItem>
                      <SelectItem value="N">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-base">Bio</h3>
            <FormField
              control={form.control}
              name="bio"
              defaultValue={user.bio}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-base">Website</h3>
            <FormField
              control={form.control}
              name="website"
              defaultValue={user.website}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput label="Website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex">
            <LoadingButton
              type="submit"
              className="ms-auto"
              loading={form.formState.isSubmitting}
            >
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
