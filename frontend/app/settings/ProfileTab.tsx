import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { User } from '@/types/users';
import updateUser from '@/lib/users/updateUser';
import AuthInputField from '../auth/AuthInputField';
import { FaLink, FaMapPin } from 'react-icons/fa';

interface Props {
  user: User;
}

export default function ProfileTab({ user }: Props) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    date_of_birth: user?.date_of_birth?.toLocaleDateString('en-CA') || '',
    location: user.location,
    gender: user.gender,
    bio: user.bio,
    website: user.website,
  });

  const handleSubmit = async () => {
    const dataToSend = { ...formData };

    const res = await updateUser(user.username, dataToSend);

    return res;
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string,
  ) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>General</h2>
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <h3 className="text-base">Name</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <AuthInputField
                name="first_name"
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) => handleInputChange(e, 'first_name')}
                error={formState?.error?.first_name}
                className="w-full"
              />
              <AuthInputField
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => handleInputChange(e, 'last_name')}
                error={formState?.error?.last_name}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <h3 className="text-base">Birthdate</h3>
            <AuthInputField
              name="date_of_birth"
              type="date"
              placeholder="Birthday"
              value={formData.date_of_birth}
              onChange={(e) => handleInputChange(e, 'date_of_birth')}
              error={formState?.error?.date_of_birth}
            />
          </div>
          <div>
            <h3 className="text-base">Location</h3>
            <AuthInputField
              name="location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => handleInputChange(e, 'location')}
              icon={<FaMapPin />}
              error={formState?.error?.location}
            />
          </div>
          <div>
            <h3 className="text-base">Gender</h3>
            <div>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange(e, 'gender')}
                className="select select-bordered w-full"
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
                <option value="N">Prefer not to say</option>
              </select>
              {formState?.error?.gender && (
                <div className="text-sm text-error">
                  {formState?.error?.gender}
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-base">Bio</h3>
            <AuthInputField
              name="bio"
              type="textarea"
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => handleInputChange(e, 'bio')}
              error={formState?.error?.bio}
            />
          </div>
          <div>
            <h3 className="text-base">Website</h3>
            <AuthInputField
              name="website"
              type="text"
              placeholder="Website"
              value={formData.website}
              onChange={(e) => handleInputChange(e, 'website')}
              icon={<FaLink />}
              error={formState?.error?.website}
            />
          </div>
          <div className="flex">
            <SubmitButton className="ms-auto" />
          </div>
        </form>
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  disabled?: boolean;
  className?: string;
}

function SubmitButton({ disabled = false, className = '' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
