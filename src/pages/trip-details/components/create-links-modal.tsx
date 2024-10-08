import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Tag, Link2 } from "lucide-react";
import { Button } from "../../../components/button";
import { api } from "../../../libs/axios";

interface CreateLinksModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinksModalProps) {
  const navigate = useNavigate()
  const { tripId } = useParams();

  const createLink = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const data = Object.fromEntries(formData.entries());

      await api.post(`trips/${tripId}/links`, data);
      
      closeCreateLinkModal()

      navigate(0)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Criar um link</h2>
            <button type="button" onClick={closeCreateLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              name="title"
              placeholder="Qual título do link?"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="url"
              name="url"
              placeholder="Cole o link ou digite"
            />
          </div>

          <Button type="submit" size="full">
            Salvar Link
          </Button>
        </form>
      </div>
    </div>
  );
}
