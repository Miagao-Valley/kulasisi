import { fetchAPI } from '@/utils/fetchAPI';
import { User } from '@/types/users';

export default async function getUser(username: string): Promise<User> {
  const { data: fetchedData } = await fetchAPI(`/users/${username}/`, {
    cache: 'no-store',
  });

  if (fetchedData.date_joined) {
    fetchedData.date_joined = new Date(fetchedData.date_joined);
  }
  if (fetchedData.last_login) {
    fetchedData.last_login = new Date(fetchedData.last_login);
  }
  if (fetchedData.date_of_birth) {
    fetchedData.date_of_birth = new Date(fetchedData.date_of_birth);
  }

  return fetchedData;
}
