let flights = [];

document.getElementById("addBtn").addEventListener("click", () => {
  const destination = document.getElementById("destination").value;
  const duration = document.getElementById("duration").value;
  const weekend = document.getElementById("weekend").checked;
  const bonus = parseInt(document.getElementById("bonus").value);
  const flightCount = parseInt(document.getElementById("flights").value);

  if (!destination || !flightCount || (destination !== "Long Layover in Europe" && !duration)) {
    alert("Please fill in all required fields.");
    return;
  }

  const finalDuration = destination === "Long Layover in Europe" ? "70" : duration;

  const flight = {
    destination,
    flights: flightCount,
    duration: finalDuration,
    weekend,
    bonus
  };

  flights.push(flight);
  updateFlights();
  updateResults();
  clearInputs();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  flights = [];
  updateFlights();
  updateResults();
});

function updateFlights() {
  const list = document.getElementById("flightList");
  list.innerHTML = "";
  flights.forEach((f, index) => {
    const item = document.createElement("div");
    item.className = "flight";
    item.innerHTML = `
      <strong>${f.destination}</strong><br>
      ${f.flights} flights, ${f.duration}h<br>
      ${f.weekend ? "Weekend" : "All Days"}, Bonus: ${f.bonus}<br>
      <button class="removeBtn" onclick="removeFlight(${index})">Remove</button>
    `;
    list.appendChild(item);
  });
}

function updateResults() {
  const results = {};
  flights.forEach((f) => {
    const score = f.bonus;
    const summary = `${f.destination}, ${f.flights} flights, ${f.duration}h, ${f.weekend ? "Weekend" : "All Days"}, Bonus: ${f.bonus}`;
    if (!results[score]) results[score] = new Set();
    results[score].add(summary);
  });

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h3>Result</h3><ul>" + 
    [100,90,80,70,60,50,40,30,20,10].map(score => {
      const entries = results[score];
      const content = entries ? Array.from(entries).join(" | ") : "–";
      return `<li><strong>${score}</strong>: ${content}</li>`;
    }).join("") +
    "</ul>";
}

function removeFlight(index) {
  flights.splice(index, 1);
  updateFlights();
  updateResults();
}

function clearInputs() {
  document.getElementById("destination").value = "";
  document.getElementById("duration").value = "";
  document.getElementById("weekend").checked = false;
  document.getElementById("bonus").value = "0";
  document.getElementById("flights").value = "";
}
