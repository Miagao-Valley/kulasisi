import React from 'react';
import AuthInputField from '../../AuthInputField';
import { FaMapPin } from 'react-icons/fa';

interface Props {
  formData: any;
  formState: any;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string,
  ) => void;
}

export default function Personal({
  formData,
  formState,
  handleInputChange,
}: Props) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <AuthInputField
          name="first_name"
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => handleInputChange(e, 'first_name')}
          error={formState?.error?.first_name}
          autoFocus={true}
        />
        <AuthInputField
          name="last_name"
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => handleInputChange(e, 'last_name')}
          error={formState?.error?.last_name}
        />
      </div>
      <AuthInputField
        name="date_of_birth"
        type="date"
        placeholder="Birthday"
        value={formData.date_of_birth}
        onChange={(e) => handleInputChange(e, 'date_of_birth')}
        error={formState?.error?.date_of_birth}
      />
      <AuthInputField
        name="location"
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => handleInputChange(e, 'location')}
        icon={<FaMapPin />}
        error={formState?.error?.location}
      />
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
          <div className="text-sm text-error">{formState?.error?.gender}</div>
        )}
      </div>
    </>
  );
}
