import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

import { DateRange } from "react-day-picker";

import { InviteGuestModal } from "./components/invite-guests-modal";
import { ConfirmTripModal } from "./components/confirm-trip-modal";
import { DestinationAndDateStep } from "./components/steps/destination-and-date-step";
import { InviteGuestsStep } from "./components/steps/invite-guests-step";
import { api } from "../../libs/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [emailsToInvite, setEmailsToInvate] = useState([
    "hamiceis@hotmail.com",
  ]);

  const openGuestsInput = () => {
    setIsGuestsInputOpen(true);
  };

  const closeGuestsInput = () => {
    setIsGuestsInputOpen(false);
  };

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true);
  };

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false);
  };

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true);
  };

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false);
  };

  const addNewEmailEmailToInvate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvate([...emailsToInvite, email]);

    event.currentTarget.reset();
  };

  const removeEmailFromInvites = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvate(newEmailList);
  };

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination) {
      return;
    }
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerEmail || !ownerName) {
      return;
    }

    try {
      const response = await api.post("/trips", {
        destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        owner_name: ownerName,
        owner_email: ownerEmail,
        emails_to_invate: emailsToInvite,
      });

      const { tripId } = response.data
      navigate(`/trips/${tripId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="w-full max-w-3xl px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src={Logo} alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao Planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{"  "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          <a href="#" className="text-zinc-300 underline">
            politicas de privacidade
          </a>
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          addNewEmailEmailToInvate={addNewEmailEmailToInvate}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          closeConfirmTripModal={closeConfirmTripModal}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
