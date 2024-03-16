export const generateRandomRGB = () => {
    const r = Math.floor(Math.random() * 256); // Random value for red (0 to 255)
    const g = Math.floor(Math.random() * 256); // Random value for green (0 to 255)
    const b = Math.floor(Math.random() * 256); // Random value for blue (0 to 255)

    return [r, g, b ];
}