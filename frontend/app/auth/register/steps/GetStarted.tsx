import React from 'react';
import AuthInputField from '../../AuthInputField';
import { FaLock, FaUser } from 'react-icons/fa';

interface Props {
  formData: any;
  formState: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: string
  ) => void;
}

export default function GetStarted({
  formData,
  formState,
  handleInputChange,
}: Props) {
  return (
    <>
      <AuthInputField
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => handleInputChange(e, 'username')}
        icon={<FaUser />}
        error={formState?.error?.username}
      />
      <AuthInputField
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleInputChange(e, 'password')}
        icon={<FaLock />}
        error={formState?.error?.password}
      />
    </>
  );
}
