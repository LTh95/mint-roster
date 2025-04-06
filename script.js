let flights = JSON.parse(localStorage.getItem("flights")) || [];
const priorityLabels = {
  0: "No Priority",
  0.1: "Low",
  0.2: "Medium",
  0.3: "High",
  0.5: "Very High"
};

function addFlight() {
  const destination = document.getElementById("destination").value;
  const flightsCount = parseInt(document.getElementById("flights").value);
  const layover = document.getElementById("layover").value;
  const priority = parseFloat(document.getElementById("priority").value);
  const weekend = document.getElementById("weekend").checked;

  if (!destination || !flightsCount || !layover) return;

  flights.push({ destination, flights: flightsCount, layover, priority, weekend });
  localStorage.setItem("flights", JSON.stringify(flights));
  updateFlightList();
  clearInputs();
}

function clearAll() {
  flights = [];
  localStorage.removeItem("flights");
  updateFlightList();
  document.getElementById("resultList").innerHTML = "";
}

function clearInputs() {
  document.getElementById("destination").value = "";
  document.getElementById("flights").value = "";
  document.getElementById("layover").value = "";
  document.getElementById("priority").value = "0";
  document.getElementById("weekend").checked = false;
}

function updateFlightList() {
  const list = document.getElementById("flightList");
  list.innerHTML = "";
  flights.forEach((f, i) => {
    const div = document.createElement("div");
    div.className = "flight-item";
    const weekendLabel = f.weekend ? "Weekend" : "All Weekdays";
    div.innerText = `${f.destination} – ${f.flights} flights – ${f.layover}h – ${weekendLabel} – Priority: ${priorityLabels[f.priority] || f.priority}`;
    list.appendChild(div);
  });
}

function calculateResults() {
  const totalFlights = flights.reduce((sum, f) => sum + f.flights, 0);
  if (totalFlights === 0) return;

  flights.forEach(f => {
    f.prob = f.flights / totalFlights;
    f.weighted = f.prob * (1 + f.priority);
  });

  const sorted = [...flights].sort((a, b) => b.weighted - a.weighted);
  const points = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  const resultList = document.getElementById("resultList");
  resultList.innerHTML = "";

  sorted.slice(0, 10).forEach((f, i) => {
    const li = document.createElement("li");
    const display = `${f.destination} — ${points[i]} points (Weighted Chance: ${(f.weighted*100).toFixed(1)}%)`;
    li.innerText = display;
    resultList.appendChild(li);
  });
}

window.onload = function () {
  updateFlightList();
};
