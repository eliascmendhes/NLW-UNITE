import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react';
import { IconButt } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table.row';
import { ChangeEvent, useState } from 'react';
import { attendees } from '../data/attendees';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function AttendeeList() {
  const [valorDoInput, alterarValorInput] = useState('')
  const [pagina, setPagina] = useState(1)
  const totalPaginas = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    alterarValorInput(event.target.value)
  }

  function goToNextPage() {
    setPagina(pagina + 1)
  }

  function goToPreviousPage() {
    setPagina(pagina - 1)
  }

  function goToFirstPage() {
    setPagina(1)
  }

  function goToLastPage() {
    setPagina(totalPaginas)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar participante..."
          />
        </div>

        {valorDoInput}
      </div>

     <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader
                style={{ width: 48 }}
                
              >
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </TableHeader>
              <TableHeader >Código</TableHeader>
              <TableHeader >Participante</TableHeader>
              <TableHeader >
                Data de inscrição
              </TableHeader>
              <TableHeader >
                Data do check-in
              </TableHeader>
              <TableHeader
                style={{ width: 64 }}
                
              ></TableHeader>
            </tr>
          </thead>
          <tbody>
            {attendees.slice((pagina - 1) * 10, pagina * 10).map((attendee) => {
              return (
                <TableRow key={attendee.id} >
                  <TableCell >
                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatRelative(attendee.createdAt, new Date(), {locale: ptBR})}</TableCell>
                  <TableCell>{formatRelative(attendee.checkdInAt, new Date(), {locale: ptBR})}</TableCell>
                  <TableCell>
                    <IconButt transparent={true}>
                      <MoreHorizontal className="size-4" />
                    </IconButt>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
                Mostrando 10 de {attendees.length} itens
              </TableCell>
              <td className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
                <div className="inline-flex items-center gap-8">
                  <span>Página {pagina} de {totalPaginas}</span>

                  <div className="flex gap-1.5">
                    <IconButt onClick={goToFirstPage} disabled={pagina === 1}>
                      <ChevronsLeft className="size-4" />
                    </IconButt>
                    <IconButt onClick={goToPreviousPage} disabled={pagina === 1}>
                      <ChevronLeft className="size-4" />
                    </IconButt>
                    <IconButt onClick={goToNextPage} disabled={pagina === totalPaginas}>
                      <ChevronRight className="size-4" />
                    </IconButt>
                    <IconButt onClick={goToLastPage} disabled={pagina === totalPaginas}>
                      <ChevronsRight className="size-4" />
                    </IconButt>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
          </Table>
    </div>
  );
}