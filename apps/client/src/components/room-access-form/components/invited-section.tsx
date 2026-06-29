/**
 * Room joining form section component for invited users.
 * Features:
 * - Name input validation
 * - Submit handling
 * - Loading states
 * - Error display
 *
 * By Hitesh S P
 */

import { ArrowRight } from 'lucide-react';
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/spinner';

import type { JoinRoomForm } from '../types';

interface InvitedSectionProps {
  register: UseFormRegister<JoinRoomForm>;
  handleSubmit: UseFormHandleSubmit<JoinRoomForm>;
  onSubmit: (data: JoinRoomForm) => Promise<boolean> | undefined;
  onError: () => void;
  errors: FieldErrors<JoinRoomForm>;
  isSubmitting: boolean;
  isCreating: boolean;
}

export const InvitedSection = ({
  register,
  handleSubmit,
  onSubmit,
  onError,
  errors,
  isSubmitting,
  isCreating,
}: InvitedSectionProps) => {
  const isDisabled = isCreating || isSubmitting;
  const nameErrorId = 'invited-name-error';

  return (
    <section aria-label="Join Room Form">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data), onError)}
        className="flex flex-col gap-y-4"
        noValidate
      >
        <div
          className="flex flex-col space-y-1.5"
          role="group"
          aria-labelledby="name-join"
        >
          <Label htmlFor="name-join" className="text-sm font-medium text-white/70 sm:text-base">
            Your Name
          </Label>
          <Input
            id="name-join"
            placeholder="Enter your name"
            className="input-premium w-full"
            disabled={isDisabled}
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? nameErrorId : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id={nameErrorId} className="text-xs text-rose-500 font-medium" role="alert">
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
            <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
          )}
          <span>{isSubmitting ? 'Joining...' : 'Join Session'}</span>
        </Button>
      </form>
    </section>
  );
};
