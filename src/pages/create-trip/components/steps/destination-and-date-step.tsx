import { useState } from "react";
import { MapPin, Calendar, ArrowRight, Settings2, X } from "lucide-react";

import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destionation: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const defaultClassNames = getDefaultClassNames();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d ' de ' LLL"))
      : null;
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <Input
        disabled={isGuestsInputOpen}
        placeholder="Para onde vai?"
        icon={MapPin}
        onChange={(event) => setDestination(event.target.value)}
      />

      <button
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 flex-1">
          {displayedDate ?? "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              classNames={{
                chevron: `${defaultClassNames.chevron} fill-lime-300`,
                today: `text-lime-300`,
                selected: `bg-lime-300 text-black`,
                range_start: "bg-lime-400 text-black rounded-l-full",
                range_end: "bg-lime-400 text-black rounded-r-full",
                range_middle: "bg-lime-500 text-black",
                disabled: "opacity-50 cursor-not-allowed",
              }}
            />
          </div>
        </div>
      )}

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
