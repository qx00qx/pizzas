import { prisma } from '@/prisma/prisma';
import { ProfileForm } from '@/shared/components/shared/profile-form';
import { getUserSession } from '@/shared/lib/getUserSession';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }
  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });
  if (!user) {
    return redirect('/not-auth');
  }
  return <ProfileForm data={user} />;
}
