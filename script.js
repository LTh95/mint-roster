
let flights = [];

function addFlight() {
    const destination = document.getElementById('destination').value;
    const numFlights = parseInt(document.getElementById('flights').value);
    const duration = document.getElementById('duration').value;
    const weekend = document.getElementById('weekend').checked;
    const bonus = parseInt(document.getElementById('bonus').value);

    if (!destination || !numFlights || !duration) return;

    // Automatischer Wert bei "Long Layover in Europe"
    const finalDuration = destination === "Long Layover in Europe" ? "70" : duration;

    const flight = {
        destination,
        numFlights,
        duration: finalDuration,
        weekend,
        bonus
    };

    flights.push(flight);
    renderFlights();
    renderResult();

    // Reset
    document.getElementById('destination').value = "";
    document.getElementById('flights').value = "";
    document.getElementById('duration').value = "";
    document.getElementById('weekend').checked = false;
    document.getElementById('bonus').value = "0";
}

function removeFlight(index) {
    flights.splice(index, 1);
    renderFlights();
    renderResult();
}

function clearAll() {
    flights = [];
    renderFlights();
    renderResult();
}

function renderFlights() {
    const container = document.getElementById('flights-list');
    container.innerHTML = '';
    flights.forEach((f, i) => {
        const div = document.createElement('div');
        div.className = 'flight-card';
        div.innerHTML = `<strong>${f.destination}</strong><br>
            ${f.numFlights} flights, ${f.duration}h<br>
            ${f.weekend ? 'Weekend' : 'All Days'}, Bonus: ${f.bonus}<br>
            <button class="remove" onclick="removeFlight(${i})">Remove</button>`;
        container.appendChild(div);
    });
}

function renderResult() {
    const result = {};
    for (let i = 10; i <= 100; i += 10) result[i] = [];

    const keys = [...new Set(flights.map(JSON.stringify))].map(JSON.parse);

    keys.forEach(flight => {
        const score = Math.min(100, Math.floor(flight.numFlights + flight.bonus));
        const rounded = Math.ceil(score / 10) * 10;
        result[rounded].push(`${flight.destination}, ${flight.numFlights} flights, ${flight.duration}h, ${flight.weekend ? 'Weekend' : 'All Days'}, Bonus: ${flight.bonus}`);
    });

    const ul = document.getElementById('result-list');
    ul.innerHTML = '';
    for (let i = 100; i >= 10; i -= 10) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${i}:</strong> ${result[i].join(' | ') || '–'}`;
        ul.appendChild(li);
    }
}
