const calculator = new StringCalculator();

function calculate() {
    const input = document.getElementById('numbers').value;
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');

    try {
        // Clear previous error
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        // Calculate sum
        const sum = calculator.add(input);
        
        // Show result with animation
        resultElement.style.opacity = '0';
        resultElement.textContent = `Result: ${sum}`;
        setTimeout(() => {
            resultElement.style.opacity = '1';
        }, 50);
        
    } catch (error) {
        // Show error with animation
        errorElement.style.display = 'block';
        errorElement.style.opacity = '0';
        errorElement.textContent = error.message;
        resultElement.textContent = 'Result: -';
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
        }, 50);
    }
}

// Add event listener for Enter key
document.getElementById('numbers').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});
