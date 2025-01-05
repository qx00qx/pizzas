import React from 'react';
import { WhiteBlock } from '../components/shared';
import { FormInput } from '../components/shared/form/form-input';
import { FormTextarea } from '../components/shared/form-textarea';
import { AddressInput } from '../components/shared/address-input/address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../components/shared/error-text';

interface Props {
  className?: string;
}

const CheckoutAddress: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock className={className} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message!} />
              )}
            </>
          )}
        />
        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutAddress;
