// A simple function to generate a random string for filenames
export function generateRandomFilename(extension: string): string {
    const randomPart = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    return `${timestamp}-${randomPart}.${extension}`;
}
