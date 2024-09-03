import { useState } from "react";
import { CreateActivityModal } from "./components/create-activity-modal";
import { ImportantsLinks } from "./components/importants-links";
import { Guests } from "./components/guests";
import { Activities } from "./components/activities";
import { DestinationAndDateHeader } from "./components/destination-and-date-header";
import { CreateLinkModal } from "./components/create-links-modal";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModal, setIsCreateLinkModal] = useState(false)

  const openCreateActivityModal = () => {
    setIsCreateActivityModalOpen(true);
  };

  const closeCreateActivityModal = () => {
    setIsCreateActivityModalOpen(false);
  };

  const openCreateLinkModal = () => {
    setIsCreateLinkModal(true);
  }

  const closeCreateLinkModal = () => {
    setIsCreateLinkModal(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <div className="w-80 space-y-6">
          <ImportantsLinks openCreateLinkModal={openCreateLinkModal}/>
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateLinkModal && (
        <CreateLinkModal 
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}
      
    </div>
  );
}
