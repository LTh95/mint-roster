
function addFlight() {
    const destination = document.getElementById('destination').value;
    const flights = document.getElementById('flights').value;
    const layover = document.getElementById('layover').value;
    const priority = document.getElementById('priority').value;
    const weekend = document.getElementById('weekend').checked ? "Weekend" : "All Weekdays";
    if (!destination || !flights || !layover) return;

    const list = document.getElementById('flight-list');
    const item = document.createElement('div');
    item.textContent = `${destination}: ${flights} flights, ${layover}h, ${weekend}, Priority: ${priority}`;
    list.appendChild(item);

    document.getElementById('flight-form').reset();
}

function clearAll() {
    document.getElementById('flight-list').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function generateResult() {
    const result = document.getElementById('result');
    result.innerHTML = "Scoring logic not implemented yet.";
}
