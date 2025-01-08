/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import useSWR from 'swr';

export interface UserDetailProps {
    userId: string
}

const MS_PER_HOUR = 60*60*1000;

export default function UserDetailPage ({userId}: UserDetailProps) {
    const { data, error, mutate, isValidating} = useSWR(`/users/${userId}`, {
      revalidateOnFocus: false,
      dedupingInterval: MS_PER_HOUR
    })
  return (
    <div>
      Name: {data?.data.username || '--'}
    </div>
  );
}
