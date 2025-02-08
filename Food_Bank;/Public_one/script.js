document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('http://localhost:3000/api/foodbank',{
        method: 'GET',

      });
      const data = await response.json();
      console.log("Fetched Data:", data);
  
      const table = document.getElementById("receiverTable");
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
          <td>${row[5]}</td>
        `;
        table.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching receiver data:", error);
    }
  });
  