import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns : column,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2 bg-white rounded-xl">
      <table className='w-full border-collapse overflow-hidden'>
        <thead className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th className='px-3 py-3 text-left text-sm font-bold border border-slate-700 whitespace-nowrap'>Sr.No</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='px-3 py-3 text-left text-sm font-bold border border-slate-700 whitespace-nowrap'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row,index) => (
            <tr key={row.id} className='hover:bg-orange-50 transition-all duration-200'>
              <td className='border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700'>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border border-slate-200 px-3 py-2 text-sm text-slate-700 whitespace-nowrap'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-4" />
    </div>
  )
}

export default DisplayTable