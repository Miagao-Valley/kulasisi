import { Gender } from '@/types/users';

const displayGender = (gender: Gender): string => {
  const genderLookup: Record<Gender, string> = {
    M: 'Male',
    F: 'Female',
    O: 'Other',
    N: 'Prefer not to say',
  };

  return genderLookup[gender] || 'Unknown';
};

export default displayGender;
