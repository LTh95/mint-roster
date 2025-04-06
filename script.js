
let flights = [];

function addFlight() {
    const dest = document.getElementById("destination").value;
    const flightCount = parseInt(document.getElementById("flights").value);
    const duration = document.getElementById("duration").value;
    const weekend = document.getElementById("weekend").checked;
    const bonus = parseInt(document.getElementById("bonus").value);

    if (!dest || isNaN(flightCount)) return;

    flights.push({ dest, flightCount, duration, weekend, bonus });
    displayFlights();
    calculateResults();
}

function displayFlights() {
    const container = document.getElementById("added-flights");
    container.innerHTML = "<h3>Added Flights:</h3>";
    flights.forEach((f, index) => {
        container.innerHTML += `
            <div>${f.dest}, ${f.flightCount} flights, ${f.duration}, ${f.weekend ? "Weekend" : "All Days"}, Bonus: ${f.bonus}
            <button onclick="removeFlight(${index})">Remove</button></div>
        `;
    });
}

function removeFlight(index) {
    flights.splice(index, 1);
    displayFlights();
    calculateResults();
}

function clearAll() {
    flights = [];
    displayFlights();
    calculateResults();
}

function calculateResults() {
    const results = Array(10).fill().map((_, i) => ({ score: (10 - i) * 10, flights: [] }));
    flights.forEach(f => {
        const match = results.find(r => r.score === f.bonus);
        if (match) match.flights.push(`${f.dest} (${f.flightCount} flights, ${f.duration})`);
    });

    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<h3>Result:</h3><ul>" + results.map(r =>
        `<li><strong>${r.score}:</strong> ${r.flights.join(", ") || "–"}</li>`
    ).join("") + "</ul>";
}
