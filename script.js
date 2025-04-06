let flights = [];

function addFlight() {
  const destination = document.getElementById("destination").value;
  const flightsCount = parseInt(document.getElementById("flights").value);
  const priority = parseFloat(document.getElementById("priority").value);

  if (!destination || !flightsCount) return;

  flights.push({ destination, flights: flightsCount, priority });
  updateFlightList();
  calculateResults();
}

function clearAll() {
  flights = [];
  updateFlightList();
  calculateResults();
}

function updateFlightList() {
  const list = document.getElementById("flightList");
  list.innerHTML = "";
  flights.forEach((f, i) => {
    const div = document.createElement("div");
    div.className = "flight-item";
    div.innerText = `${f.destination} – ${f.flights} flights – Priority: ${f.priority}`;
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
