
let flights = [];

function addFlight() {
    const destination = document.getElementById("destination").value;
    const flightsNum = document.getElementById("flights").value;
    const duration = document.getElementById("duration").value;
    const weekend = document.getElementById("weekend").checked ? "Weekend" : "All Days";
    const bonus = parseInt(document.getElementById("bonus").value);

    const flight = { destination, flights: flightsNum, duration, weekend, bonus };
    flights.push(flight);
    updateDisplay();
}

function clearFlights() {
    flights = [];
    updateDisplay();
}

function removeFlight(index) {
    flights.splice(index, 1);
    updateDisplay();
}

function updateDisplay() {
    const flightList = document.getElementById("flightList");
    const resultList = document.getElementById("resultList");
    flightList.innerHTML = "<h2>Added Flights:</h2>" + flights.map((f, i) =>
        `<div>${f.destination}, ${f.flights} flights, ${f.duration}h, ${f.weekend}, Bonus: ${f.bonus} <button onclick="removeFlight(${i})">Remove</button></div>`
    ).join("");

    const results = Array(10).fill("–");
    flights.forEach(f => {
        const scoreIndex = Math.floor(f.bonus / 10);
        results[10 - scoreIndex - 1] = `${f.destination}, ${f.flights} flights, ${f.duration}h, ${f.weekend}`;
    });

    resultList.innerHTML = results.map((res, i) =>
        `<li><strong>${(10 - i) * 10}:</strong> ${res}</li>`
    ).join("");
}
