import { Link2, Plus } from "lucide-react";

export function ImportantsLinks() {
  return (
    <div className="space-y-6">
    <h2 className="font-semibold text-xl">Links importantes</h2>

    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="block font-medium text-zinc-100">
            Reserva do AirBnB
          </span>
          <a
            href="#"
            className="block w-72 text-xs text-zinc-400 truncate hover:text-zinc-200"
          >
            https://www.airbnb.com.br/rooms/104700821903812038910
          </a>
        </div>

        <Link2 className="text-zinc-400 size-5 shrink-0" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="block font-medium text-zinc-100">
            Reserva do AirBnB
          </span>
          <a
            href="#"
            className="w-72 block text-xs text-zinc-400 truncate hover:text-zinc-200"
          >
            https://www.airbnb.com.br/rooms/10470001131209382190381
          </a>
        </div>

        <Link2 className="text-zinc-400 size-5 shrink-0" />
      </div>
    </div>

    <button className="bg-zinc-800 w-full flex justify-center items-center text-zinc-200 rounded-lg px-5 h-11 font-medium gap-2 hover:bg-zinc-700">
      <Plus className="size-5" />
      Cadastrar novo link
    </button>
  </div>

  )
}