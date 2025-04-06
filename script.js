
let flights = [];

function addFlight() {
    const destination = document.getElementById('destination').value;
    const number = document.getElementById('flights').value;
    const layover = document.getElementById('layover').value;
    const priority = document.getElementById('priority').value;
    const weekend = document.getElementById('weekend').checked;

    if (!destination || !number || !layover) {
        alert("Please fill in all required fields.");
        return;
    }

    const flight = {
        destination,
        number: parseInt(number),
        layover,
        priority,
        weekend,
    };

    flights.push(flight);
    updateFlightList();
    resetForm();
}

function resetForm() {
    document.getElementById('destination').value = "";
    document.getElementById('flights').value = "";
    document.getElementById('layover').value = "";
    document.getElementById('priority').value = "No Priority";
    document.getElementById('weekend').checked = false;
}

function updateFlightList() {
    const container = document.getElementById('flight-list');
    container.innerHTML = "";
    flights.forEach((f, i) => {
        container.innerHTML += `
            <div class='card'>
                <strong>${f.destination}</strong><br/>
                ${f.number} flights, ${f.layover}h<br/>
                ${f.weekend ? "Weekend" : "All Weekdays"}, Priority: ${f.priority}
                <button onclick="removeFlight(${i})">Remove</button>
            </div>`;
    });
}

function removeFlight(index) {
    flights.splice(index, 1);
    updateFlightList();
}

function clearAll() {
    flights = [];
    updateFlightList();
    document.getElementById('results').innerHTML = "";
}

function calculate() {
    const priorities = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    const sorted = [...flights].sort((a, b) => {
        let scoreA = a.number;
        let scoreB = b.number;
        const bonusMap = { "Low": 25, "Medium": 50, "High": 75, "Very High": 100 };
        if (a.priority !== "No Priority") scoreA += bonusMap[a.priority];
        if (b.priority !== "No Priority") scoreB += bonusMap[b.priority];
        return scoreB - scoreA;
    });

    const assigned = sorted.slice(0, priorities.length);
    const results = assigned.map((flight, i) => {
        return `<li><strong>${priorities[i]}</strong>: ${flight.destination}, ${flight.number} flights, ${flight.layover}h, ${flight.weekend ? "Weekend" : "All Weekdays"}, Priority: ${flight.priority}</li>`;
    });

    document.getElementById('results').innerHTML = `<ul>${results.join("")}</ul>`;
}
