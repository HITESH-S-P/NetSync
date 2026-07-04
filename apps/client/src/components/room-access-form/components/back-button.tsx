/**
 * Back button component that navigates back to room creation/joining.
 * Features:
 * - Click handling
 * - Disabled state support
 * - Accessible button with label
 *
 * By Hitesh S P
 */

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const BackButton = ({ onClick, disabled }: BackButtonProps) => (
  <Button
    variant="link"
    className="text-white/60 hover:text-white size-fit p-0 no-underline hover:no-underline transition-colors duration-200"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    aria-label="Back to create or join room page"
  >
    <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
    <span>Back to create/join room</span>
  </Button>
);

export { BackButton };
