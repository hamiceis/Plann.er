import { MapPin, Calendar, ArrowRight, Settings2 } from "lucide-react";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <Input
        disabled={isGuestsInputOpen}
        placeholder="Para onde vai?"
        icon={MapPin}
      />

      <Input
        containerSize="sm"
        inputSize="sm"
        placeholder="Quando?"
        disabled={isGuestsInputOpen}
        icon={Calendar}
      />

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
