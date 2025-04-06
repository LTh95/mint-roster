
let flights = [];

function addFlight() {
  const dest = document.getElementById("destination").value;
  const count = document.getElementById("flights").value;
  const layover = document.getElementById("layover").value;
  const priority = document.getElementById("priority").value;
  const weekend = document.getElementById("weekend").checked ? "Weekend" : "All Weekdays";

  if (!dest || !count || !layover || !priority) return;

  flights.push({ dest, count: parseInt(count), layover, priority, weekend });
  localStorage.setItem("flights", JSON.stringify(flights));
  renderFlights();
  resetInputs();
}

function resetInputs() {
  document.getElementById("destination").selectedIndex = 0;
  document.getElementById("flights").value = "";
  document.getElementById("layover").selectedIndex = 0;
  document.getElementById("priority").selectedIndex = 0;
  document.getElementById("weekend").checked = false;
}

function renderFlights() {
  const container = document.getElementById("flightList");
  container.innerHTML = "";
  flights.forEach((f, index) => {
    container.innerHTML += `
      <div class="flight-card">
        <strong>${f.dest}</strong><br/>
        ${f.count} flights, ${f.layover}h<br/>
        ${f.weekend}, Priority: ${f.priority}<br/>
        <button class="btn btn-danger btn-sm mt-2" onclick="removeFlight(${index})">Remove</button>
      </div>`;
  });
}

function removeFlight(index) {
  flights.splice(index, 1);
  localStorage.setItem("flights", JSON.stringify(flights));
  renderFlights();
}

function clearAll() {
  flights = [];
  localStorage.removeItem("flights");
  renderFlights();
}

function generateResults() {
  const scores = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  const resultMap = {};
  flights.sort((a, b) => {
    const p = { "Very High": 4, High: 3, Medium: 2, Low: 1, "No Priority": 0 };
    return (p[b.priority] || 0) - (p[a.priority] || 0);
  });

  const used = new Set();
  let i = 0;
  for (const score of scores) {
    while (i < flights.length && used.has(i)) i++;
    if (i >= flights.length) break;
    resultMap[score] = flights[i];
    used.add(i);
  }

  let html = "<h5>Result</h5><ul>";
  scores.forEach(score => {
    if (resultMap[score]) {
      const f = resultMap[score];
      html += `<li><strong>${score}:</strong> ${f.dest}, ${f.count} flights, ${f.layover}h, ${f.weekend}, Priority: ${f.priority}</li>`;
    } else {
      html += `<li><strong>${score}:</strong> –</li>`;
    }
  });
  html += "</ul>";
  document.getElementById("result").innerHTML = html;
}

window.onload = () => {
  const saved = localStorage.getItem("flights");
  if (saved) {
    flights = JSON.parse(saved);
    renderFlights();
  }
};
