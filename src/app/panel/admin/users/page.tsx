'use client';

import useSWR from 'swr';
import { getUsers } from '@/features/users/users.service';

export default function AdminUserPage() {
  const { data, isLoading, error } = useSWR('users', () =>
    getUsers({ page: 1, take: 10 })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <p>There are {data?.data?.length} users in the database</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
