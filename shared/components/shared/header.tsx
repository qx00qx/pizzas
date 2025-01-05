'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './searchInput';
import CartButton from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals/auth-modal/auth-modal';
import { useSession } from 'next-auth/react';

interface IProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<IProps> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  useEffect(() => {
    if (searchParams.has('paid')) {
      toast.success('Заказ успешно оплачен!');
      router.replace('/');
    }

    if (searchParams.has('verified')) {
      toast.success('Email успешно подтвержден!\nВы можете авторизоваться');
    }
  }, []);
  return (
    <header className={cn('', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Pizza&apos;s</h1>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-4">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          <div>{hasCart && <CartButton />}</div>
        </div>
      </Container>
    </header>
  );
};
