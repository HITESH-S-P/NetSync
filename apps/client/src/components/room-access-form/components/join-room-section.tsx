/**
 * Room joining form section component that provides room joining functionality.
 * Features:
 * - Room ID validation
 * - Name input validation
 * - Submit handling
 * - Loading states
 * - Clipboard quick-paste support
 *
 * By Hitesh S P
 */

import { ArrowRight, Clipboard } from 'lucide-react';
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/spinner';

import type { JoinRoomForm } from '../types';
import { onRoomIdChange } from '../utils';

interface JoinRoomSectionProps {
  register: UseFormRegister<JoinRoomForm>;
  setValue: UseFormSetValue<JoinRoomForm>;
  handleSubmit: UseFormHandleSubmit<JoinRoomForm>;
  onSubmit: (data: JoinRoomForm) => Promise<boolean> | undefined;
  onError: () => void;
  errors: FieldErrors<JoinRoomForm>;
  isSubmitting: boolean;
  isCreating: boolean;
}

export const JoinRoomSection = ({
  register,
  setValue,
  handleSubmit,
  onSubmit,
  onError,
  errors,
  isSubmitting,
  isCreating,
}: JoinRoomSectionProps) => {
  const isDisabled = isCreating || isSubmitting;
  const roomIdErrorId = 'room-id-error';
  const nameErrorId = 'name-join-error';

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const sanitized = text.trim();
      setValue('roomId', sanitized, { shouldValidate: true });
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  return (
    <section aria-labelledby="join-room-heading">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data), onError)}
        className="flex flex-col space-y-3 sm:space-y-4"
        noValidate
      >
        <h2 id="join-room-heading" className="text-lg font-bold text-white sm:text-xl">
          Join a Room
        </h2>
        
        <div
          className="flex flex-col space-y-1.5"
          role="group"
          aria-labelledby="room-id"
        >
          <Label htmlFor="room-id" className="text-sm font-medium text-white/70 sm:text-base">
            Room ID
          </Label>
          <div className="relative flex items-center">
            <Input
              id="room-id"
              placeholder="XXXX-XXXX"
              className="input-modern font-mono w-full pr-10"
              disabled={isDisabled}
              aria-required="true"
              aria-invalid={errors.roomId ? 'true' : 'false'}
              aria-describedby={errors.roomId ? roomIdErrorId : undefined}
              {...register('roomId', {
                onChange: (e) => onRoomIdChange(e, setValue),
              })}
            />
            <button
              type="button"
              onClick={handlePasteClick}
              disabled={isDisabled}
              className="absolute right-3 text-white/40 hover:text-white/80 transition-colors"
              title="Paste Room ID from clipboard"
            >
              <Clipboard className="size-4" />
            </button>
          </div>
          {errors.roomId && (
            <p id={roomIdErrorId} className="text-xs text-rose-500 font-medium" role="alert">
              {errors.roomId.message}
            </p>
          )}
        </div>

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
            className="input-modern w-full"
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
          className="btn-gradient w-full py-6 flex items-center justify-center gap-2 border-0"
          disabled={isDisabled}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner className="size-4 sm:size-5" />
          ) : (
            <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
          )}
          <span>{isSubmitting ? 'Joining...' : 'Join Room'}</span>
        </Button>
      </form>
    </section>
  );
};
