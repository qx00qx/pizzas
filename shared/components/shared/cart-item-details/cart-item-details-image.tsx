import { cn } from '@/shared/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} />;
};
