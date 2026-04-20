import { useState } from "react";
import clsx from "clsx";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

export default function Table({
  data = [],
  columns = [],
  variant,
  chamfer = true,
  size,
  caption,
  emptyMessage = "No rows to display.",
  initialSorting = [],
  getRowId,
  onRowClick,
  className,
  ...props
}) {
  const [sorting, setSorting] = useState(initialSorting);

  // TanStack manages internal table functions here; this hook is expected.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getRowId,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const leafColumnCount = table.getAllLeafColumns().length || 1;

  return (
    <div
      className={clsx(
        styles.root,
        !variant && styles.pageBackground,
        styles[variant],
        chamfer && chamferStyles.chamfer,
        size === "large" && styles.large,
        size === "small" && styles.small,
        className
      )}
      {...props}
    >
      <div className={styles.scroller}>
        <table className={styles.table}>
          {caption ? <caption className={styles.caption}>{caption}</caption> : null}
          <thead className={clsx(styles.head, hatchStyles.hatch)}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.headerRow}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      scope="col"
                      className={styles.headerCell}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className={styles.sortButton}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className={styles.headerContent}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          <span className={styles.sortLabel}>
                            {sorted === "asc"
                              ? "asc"
                              : sorted === "desc"
                                ? "desc"
                                : "sort"}
                          </span>
                        </button>
                      ) : (
                        <span className={styles.headerContent}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={styles.body}>
            {rows.length > 0 ? (
              rows.map((row) => {
                const clickable = Boolean(onRowClick);

                return (
                  <tr
                    key={row.id}
                    className={clsx(
                      styles.row,
                      clickable && styles.rowInteractive
                    )}
                    onClick={clickable ? () => onRowClick(row) : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={styles.cell}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr className={styles.emptyRow}>
                <td className={styles.emptyCell} colSpan={leafColumnCount}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
