// Load the cookies and display them into the table
// Satisfies: "...opens a third page called confirm.html that reads
// and displays information from all the fields."
window.addEventListener("load", () => {
  const cookies = getAllCookies();
  const confirmTable = document.getElementById("confirmTable");

  let tableHtmlStr = "<thead><th>Key</th><th>Value</th></thead><tbody>";

  Object.entries(cookies).forEach(([key, value]) => {
    tableHtmlStr += `
      <tr>
        <td>${key}</td>
        <td>${JSON.stringify(value)}</td>
      </tr>
    `;
  });

  confirmTable.innerHTML = `${tableHtmlStr}</tbody>`;
});
