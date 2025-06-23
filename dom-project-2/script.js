document.addEventListener('DOMContentLoaded', function() {
    // Get the elements from the DOM
    const colorBox = document.getElementById('color-box');
    const changeColorBtn = document.getElementById('change-color-btn');
    
    // Function to generate a random hex color
    function getRandomColor() {
        // Generate random values for red, green, and blue components
        const letters = '0123456789ABCDEF';
        let color = '#';
        
        // Create a 6-digit hex color code
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    }
    
    // Event listener for the button click
    changeColorBtn.addEventListener('click', function() {
        // Get a random color and apply it to the box
        const randomColor = getRandomColor();
        colorBox.style.backgroundColor = randomColor;
        
        // Optional: Display the color code
        console.log('Changed color to:', randomColor);
    });
});