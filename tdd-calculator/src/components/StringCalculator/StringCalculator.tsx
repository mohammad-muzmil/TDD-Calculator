import React, { useState } from 'react';

export function add(numbers: string): number {
    if (numbers === '') return 0;
    
    // Handle custom delimiter
    let delimiter = ',';
    let numbersToProcess = numbers;
    
    if (numbers.startsWith('//')) {
        const firstNewLine = numbers.indexOf('\n');
        delimiter = numbers.substring(2, firstNewLine);
        numbersToProcess = numbers.substring(firstNewLine + 1);
    }
    
    // Replace new lines with delimiter
    numbersToProcess = numbersToProcess.replace(/\n/g, delimiter);
    
    // Split and convert to numbers
    const nums = numbersToProcess.split(delimiter).map(num => parseInt(num.trim()));
    
    // Check for negative numbers
    const negativeNumbers = nums.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
    }
    
    // Calculate sum
    return nums.reduce((sum, num) => sum + num, 0);
}

const StringCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleCalculate = () => {
        try {
            setError('');
            const sum = add(input);
            setResult(`Result: ${sum}`);
        } catch (err) {
            setResult('');
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return (
        <div className="calculator-container">
            <h1>String Calculator</h1>
            <div className="input-section">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter numbers (comma separated)"
                    rows={4}
                />
                <button onClick={handleCalculate}>Calculate</button>
            </div>
            {result && <div className="result">{result}</div>}
            {error && <div className="error">{error}</div>}
            
            <div className="instructions">
                <h3>Instructions:</h3>
                <ul>
                    <li>Enter numbers separated by commas (e.g., "1,2,3")</li>
                    <li>You can use new lines between numbers (e.g., "1\n2,3")</li>
                    <li>To use a custom delimiter, start with //[delimiter]\n (e.g., "//;\n1;2")</li>
                    <li>Negative numbers are not allowed</li>
                </ul>
            </div>
        </div>
    );
};

export default StringCalculator;
