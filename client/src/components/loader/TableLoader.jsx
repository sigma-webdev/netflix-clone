const TableLoading = ({ colLength }) => {
  return (
    <>
      {Array(10)
        .fill("")
        .map((d, i) => (
          <tr key={i} className="animate-pulse">
            {Array(colLength)
              .fill("")
              .map((data, index) => (
                <td key={index} className=" rounded px-6 py-4 ">
                  <div className="h-4 rounded bg-red-200"></div>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
};

export default TableLoading;
