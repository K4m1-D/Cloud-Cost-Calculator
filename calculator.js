const pricing = {
    aws: {
        storage: 0.023,
        compute: 0.0116,
        bandwidth: 0.09,
        name: "AWS"
    },
    azure: {
        storage: 0.020,
        compute: 0.0120,
        bandwidth: 0.087,
        name: "Microsoft Azure"
    },
    gcp: {
        storage: 0.020,
        compute: 0.0104,
        bandwidth: 0.085,
        name: "Google Cloud"
    }
};

function validateInputs(storage, compute, bandwidth) {
    if (storage < 0 || compute < 0 || bandwidth < 0) {
        alert('Please enter positive numbers only');
        return false;
    }
    
    if (storage > 10000 || compute > 730 || bandwidth > 5000) {
        alert('Values exceed reasonable limits');
        return false;
    }
    
    return true;
}

function calculateCost() {
    const provider = document.getElementById('provider').value;
    const storage = parseFloat(document.getElementById('storage').value) || 0;
    const compute = parseFloat(document.getElementById('compute').value) || 0;
    const bandwidth = parseFloat(document.getElementById('bandwidth').value) || 0;
    
    if (!validateInputs(storage, compute, bandwidth)) {
        return;
    }
    
    const rates = pricing[provider];
    
    const storageCost = storage * rates.storage;
    const computeCost = compute * rates.compute;
    const bandwidthCost = bandwidth * rates.bandwidth;
    const totalCost = storageCost + computeCost + bandwidthCost;
    
    const resultDiv = document.getElementById('result');
    const costAmount = document.getElementById('costAmount');
    const breakdown = document.getElementById('breakdown');
    
    costAmount.textContent = `$${totalCost.toFixed(2)}`;
    breakdown.innerHTML = `
        <strong>${rates.name} Breakdown:</strong><br>
        Storage: $${storageCost.toFixed(2)} (${storage} GB)<br>
        Compute: $${computeCost.toFixed(2)} (${compute} hours)<br>
        Data Transfer: $${bandwidthCost.toFixed(2)} (${bandwidth} GB)
    `;
    
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateCost();
            }
        });
    });
});
