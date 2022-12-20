const fileInput = document.getElementById('file-input');
const pieceCountSelect = document.getElementById('piece-count');
const generateButton = document.getElementById('generate-button');
const resetButton = document.getElementById('reset-button');
const imageContainer = document.querySelector('.image-container');
const puzzleContainer = document.querySelector('.puzzle-container');

// Initialize variables
let image;
let pieceSize;
let pieces;
let initialPositions;

// Event listener for the file input
fileInput.addEventListener('change', (event) => {
  // Get the selected image file
  const file = event.target.files[0];
  // Load the image file
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    image = new Image();
    image.src = reader.result;
    image.addEventListener('load', () => {
      // Display the image in the page
      imageContainer.innerHTML = '';
      imageContainer.appendChild(image);
    });
  });
  reader.readAsDataURL(file);
});

// Event listener for the generate button
generateButton.addEventListener('click', () => {
  // Calculate the size of each puzzle piece
  pieceSize = Math.floor(image.naturalWidth / Math.sqrt(pieceCountSelect.value));
  // Create the puzzle pieces
  pieces = createPieces(image, pieceSize);
  // Display the puzzle pieces
  puzzleContainer.innerHTML = '';
  pieces.forEach((piece) => {
    puzzleContainer.appendChild(piece);
  });
  // Store the initial positions of the puzzle pieces
  initialPositions = pieces.map((piece) => {
    return piece.getBoundingClientRect();
  });
  // Add event listeners for the puzzle pieces
  pieces.forEach((piece, index) => {
    piece.addEventListener('click', () => {
      shufflePieces(pieces, index, initialPositions);
    });
  });
});

// Function for creating the puzzle pieces
function createPieces(image, pieceSize) {
  const pieces = [];
  for (let i = 0; i < image.naturalHeight; i += pieceSize) {
    for (let j = 0; j < image.naturalWidth; j += pieceSize) {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.style.backgroundImage = `url(${image.src})`;
      piece.style.backgroundSize = `${image.naturalWidth}px ${image.naturalHeight}px`;
      piece.style.backgroundPosition = `-${j}px -${i}px`;
      pieces.push(piece);
    }}};
    // Function for shuffling the puzzle pieces
function shufflePieces(pieces, index, initialPositions) {
    const emptyPiece = initialPositions[index];
    const currentPosition = pieces[index].getBoundingClientRect();
    // Swap the positions of the clicked piece and the empty piece
    pieces[index].style.transform = `translate(${emptyPiece.x - currentPosition.x}px, ${emptyPiece.y - currentPosition.y}px)`;
    initialPositions[index] = currentPosition;
    initialPositions[index] = emptyPiece;
};