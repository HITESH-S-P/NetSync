/**
 * Create room section component that provides room creation form.
 * Features:
 * - Name input validation
 * - Submit handling
 * - Loading states
 * - Error display
 *
 * By Hitesh S P
 */

import { CirclePlus } from 'lucide-react';
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/spinner';

import type { CreateRoomForm } from '../types';

interface CreateRoomSectionProps {
  register: UseFormRegister<CreateRoomForm>;
  handleSubmit: UseFormHandleSubmit<CreateRoomForm>;
  onSubmit: (data: CreateRoomForm) => Promise<string> | undefined;
  onError: () => void;
  errors: FieldErrors<CreateRoomForm>;
  isSubmitting: boolean;
  isJoining: boolean;
}

export const CreateRoomSection = ({
  register,
  handleSubmit,
  onSubmit,
  onError,
  errors,
  isSubmitting,
  isJoining,
}: CreateRoomSectionProps) => {
  const isDisabled = isSubmitting || isJoining;
  const inputId = 'name-create';
  const errorId = 'name-error';

  return (
    <section aria-labelledby="create-room-heading">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data), onError)}
        className="flex flex-col space-y-3 sm:space-y-4"
        noValidate
      >
        <h2 id="create-room-heading" className="text-lg font-bold text-white sm:text-xl">
          Create a Room
        </h2>
        <div
          className="flex flex-col space-y-1.5"
          role="group"
          aria-labelledby={inputId}
        >
          <Label htmlFor={inputId} className="text-sm font-medium text-white/70 sm:text-base">
            Your Name
          </Label>
          <Input
            id={inputId}
            placeholder="Enter your name"
            className="input-premium w-full"
            disabled={isDisabled}
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? errorId : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id={errorId} className="text-xs text-rose-500 font-medium" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="btn-premium w-full flex items-center justify-center gap-2"
          disabled={isDisabled}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner className="size-4 sm:size-5" />
          ) : (
            <CirclePlus className="size-4 sm:size-5" aria-hidden="true" />
          )}
          <span>{isSubmitting ? 'Creating...' : 'Create Room'}</span>
        </Button>
      </form>
    </section>
  );
};
