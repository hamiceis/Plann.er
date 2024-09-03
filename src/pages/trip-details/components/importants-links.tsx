import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../libs/axios";

interface ImportantsLinksProps {
  openCreateLinkModal: () => void;
}

interface LinksProps {
  id: string;
  title: string;
  url: string;
}

export function ImportantsLinks({ openCreateLinkModal }: ImportantsLinksProps) {
  const { tripId } = useParams();
  const [links, setLinks] = useState<LinksProps[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
      .catch((error) => console.log(error));
  }, [tripId]);


  const copyText = (link: string) => {
    navigator.clipboard.writeText(link);
    alert("texto copíado")
  }
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links.length > 0 ? (
          links.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href="#"
                    className="block w-72 text-xs text-zinc-400 truncate hover:text-zinc-200"
                  >
                    {link.url}
                  </a>
                </div>

                <button 
                className="group"
                type="button" onClick={() => copyText(link.url)}>
                  <Link2 className="text-zinc-400 size-5 shrink-0 group-hover:text-zinc-100" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-600">
                Não há links disponíveis
              </span>
            </div>
          </div>
        )}
      </div>

      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
