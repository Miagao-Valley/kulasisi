import React from 'react';
import AuthInputField from '../../AuthInputField';
import { MdEmail, MdPhone } from 'react-icons/md';

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

export default function Contact({
  formData,
  formState,
  handleInputChange,
}: Props) {
  return (
    <>
      <AuthInputField
        name="email"
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleInputChange(e, 'email')}
        icon={<MdEmail />}
        error={formState?.error?.email}
      />
      <AuthInputField
        name="phone_number"
        type="tel"
        placeholder="Phone number"
        value={formData.phone_number}
        onChange={(e) => handleInputChange(e, 'phone_number')}
        icon={<MdPhone />}
        error={formState?.error?.phone_number}
      />
    </>
  );
}
