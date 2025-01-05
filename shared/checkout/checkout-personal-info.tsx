import React from 'react';
import { WhiteBlock } from '../components/shared';
import { Input } from '../components/ui/input';
import { FormInput } from '../components/shared/form/form-input';

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={className} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput
          required
          name="phone"
          className="text-base"
          placeholder="Телефон"
        />
      </div>
    </WhiteBlock>
  );
};
