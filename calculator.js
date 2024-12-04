class StringCalculator {
    add(numbers) {
        if (!numbers) {
            return 0;
        }

        let delimiter = ',';
        let numbersStr = numbers;

        // Check for custom delimiter
        if (numbers.startsWith('//')) {
            const firstNewLine = numbers.indexOf('\n');
            delimiter = numbers.substring(2, firstNewLine);
            numbersStr = numbers.substring(firstNewLine + 1);
        }

        // Replace new lines with delimiter
        numbersStr = numbersStr.replace(/\n/g, delimiter);

        // Split the string into numbers
        const numStrArray = numbersStr.split(delimiter);

        // Validate each number
        for (let numStr of numStrArray) {
            const trimmed = numStr.trim();
            if (trimmed !== '' && !/^-?\d+$/.test(trimmed)) {
                throw new Error(`invalid input: "${trimmed}" is not a valid number`);
            }
        }

        // Convert to numbers and check for negative values
        const nums = numStrArray.map(num => {
            const parsedNum = parseInt(num.trim());
            return isNaN(parsedNum) ? 0 : parsedNum;
        });

        // Check for negative numbers
        const negativeNumbers = nums.filter(num => num < 0);
        if (negativeNumbers.length > 0) {
            throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
        }

        // Sum the numbers
        return nums.reduce((sum, num) => sum + num, 0);
    }
}
