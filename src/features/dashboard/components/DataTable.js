function DataTable({ columns, data, rowKey = 'id', emptyMessage = 'No records found.' }) {
  return <div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{data.length ? data.map((row, index) => <tr key={row[rowKey] || index}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>) : <tr><td className="dashboard-table-empty" colSpan={columns.length}>{emptyMessage}</td></tr>}</tbody></table></div>;
}

export default DataTable;
