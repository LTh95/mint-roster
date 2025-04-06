
const flightForm = document.getElementById('flightForm');
const flightList = document.getElementById('flightList');
const resultsList = document.getElementById('resultsList');
const clearAllBtn = document.getElementById('clearAll');

let flights = [];

flightForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value;
    const numFlights = parseInt(document.getElementById('flights').value);
    const duration = document.getElementById('duration').value;
    const weekend = document.getElementById('weekend').checked;
    const bonus = parseInt(document.getElementById('bonus').value);

    if (!destination || !duration || !numFlights) return;

    const flight = {
        destination,
        numFlights,
        duration,
        weekend,
        bonus
    };

    flights.push(flight);
    updateFlightList();
    updateResults();

    // Reset fields
    flightForm.reset();
});

clearAllBtn.addEventListener('click', () => {
    flights = [];
    updateFlightList();
    updateResults();
});

function updateFlightList() {
    flightList.innerHTML = '';
    flights.forEach((flight, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${flight.destination}</strong><br>${flight.numFlights} flights, ${flight.duration}h<br>${flight.weekend ? 'Weekend' : 'All Days'}, Bonus: ${flight.bonus} <br><button onclick="removeFlight(${index})">Remove</button>`;
        flightList.appendChild(div);
    });
}

function removeFlight(index) {
    flights.splice(index, 1);
    updateFlightList();
    updateResults();
}

function updateResults() {
    const scores = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    const results = {};
    scores.forEach(score => results[score] = []);

    flights.forEach(flight => {
        const score = flight.bonus;
        if (results[score]) {
            results[score].push(`${flight.destination}, ${flight.numFlights} flights, ${flight.duration}h, ${flight.weekend ? 'Weekend' : 'All Days'}`);
        }
    });

    resultsList.innerHTML = '';
    scores.forEach(score => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${score}:</strong> ${results[score].length ? results[score].join(' | ') : '–'}`;
        resultsList.appendChild(li);
    });
}
