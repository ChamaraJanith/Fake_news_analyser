document.getElementById('checkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const textInput = document.getElementById('textInput').value;
    const loading = document.querySelector('.loading-spinner');
    const results = document.getElementById('results');
    const statusBadge = document.getElementById('statusBadge');
    const resultText = document.getElementById('resultText');
    const confidenceBar = document.getElementById('confidenceBar');

    if (!textInput.trim()) return;

    // Show loading
    loading.style.display = 'block';
    results.style.display = 'none';

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textInput })
        });

        const data = await response.json();

        // Hide loading
        loading.style.display = 'none';
        results.style.display = 'block';

        // Update UI
        statusBadge.textContent = data.status;
        statusBadge.className = 'status-badge ' + (data.status === 'Reliable' ? 'status-reliable' : 'status-fake');
        resultText.textContent = data.explanation;
        
    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        alert('Something went wrong. Please try again.');
    }
});
