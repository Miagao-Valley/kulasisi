import { Gender } from '@/types';

const displayGender = (gender: Gender): string => {
  const genderLookup: Record<Gender, string> = {
    M: 'Male',
    F: 'Female',
    O: 'Other',
    '': 'Prefer not to say',
  };

  return genderLookup[gender] || 'Unknown';
};

export default displayGender;
