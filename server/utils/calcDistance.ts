type Coordinate = {
    longitude: number;
    latitude: number;
};

/**
 * Calculate the distance between two GPS coordinates using the Haversine formula
 *
 * @param coord1 - First coordinate (latitude, longitude)
 * @param coord2 - Second coordinate (latitude, longitude)
 * @param unit - Unit of measurement ('km' for kilometers, 'm' for meters)
 * @returns Distance between the coordinates in the specified unit
 */
export function getDistanceBetweenCoordinates(
    coord1: Coordinate,
    coord2: Coordinate,
    unit: "km" | "m" = "km"
): number {
    // Validate coordinates
    if (!isValidCoordinate(coord1) || !isValidCoordinate(coord2)) {
        throw new Error("Invalid coordinates provided");
    }

    // Earth's radius in kilometers
    const EARTH_RADIUS_KM = 6371;

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(coord1.latitude);
    const lon1Rad = toRadians(coord1.longitude);
    const lat2Rad = toRadians(coord2.latitude);
    const lon2Rad = toRadians(coord2.longitude);

    // Calculate differences
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Apply Haversine formula
    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate distance in kilometers
    const distanceKm = EARTH_RADIUS_KM * c;

    // Return in requested unit
    switch (unit) {
        case "m":
            return Math.round(distanceKm * 1000 * 100) / 100; // Convert to meters, round to 2 decimal places
        case "km":
        default:
            return Math.round(distanceKm * 100) / 100; // Round to 2 decimal places
    }
}

/**
 * Convert degrees to radians
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Validate if coordinate is within valid GPS ranges
 * @param coord - Coordinate to validate
 * @returns true if coordinate is valid, false otherwise
 */
function isValidCoordinate(coord: Coordinate): boolean {
    if (
        !coord ||
        typeof coord.latitude !== "number" ||
        typeof coord.longitude !== "number"
    ) {
        return false;
    }

    // Latitude must be between -90 and 90 degrees
    if (coord.latitude < -90 || coord.latitude > 90) {
        return false;
    }

    // Longitude must be between -180 and 180 degrees
    if (coord.longitude < -180 || coord.longitude > 180) {
        return false;
    }

    return true;
}

/**
 * Calculate distance with bearing (direction) information
 * @param coord1 - Starting coordinate
 * @param coord2 - Ending coordinate
 * @param unit - Unit of measurement
 * @returns Object with distance and bearing
 */
export function getDistanceWithBearing(
    coord1: Coordinate,
    coord2: Coordinate,
    unit: "km" | "m" = "km"
): { distance: number; bearing: number; compassDirection: string } {
    const distance = getDistanceBetweenCoordinates(coord1, coord2, unit);
    const bearing = calculateBearing(coord1, coord2);
    const compassDirection = getCompassDirection(bearing);

    return {
        distance,
        bearing: Math.round(bearing * 100) / 100,
        compassDirection,
    };
}

/**
 * Calculate the bearing (direction) from coord1 to coord2
 * @param coord1 - Starting coordinate
 * @param coord2 - Ending coordinate
 * @returns Bearing in degrees (0-360)
 */
function calculateBearing(coord1: Coordinate, coord2: Coordinate): number {
    const lat1Rad = toRadians(coord1.latitude);
    const lat2Rad = toRadians(coord2.latitude);
    const deltaLonRad = toRadians(coord2.longitude - coord1.longitude);

    const y = Math.sin(deltaLonRad) * Math.cos(lat2Rad);
    const x =
        Math.cos(lat1Rad) * Math.sin(lat2Rad) -
        Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLonRad);

    let bearing = Math.atan2(y, x);
    bearing = ((bearing * 180) / Math.PI + 360) % 360; // Convert to degrees and normalize

    return bearing;
}

/**
 * Convert bearing to compass direction
 * @param bearing - Bearing in degrees
 * @returns Compass direction string
 */
function getCompassDirection(bearing: number): string {
    const directions = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];

    const index = Math.round(bearing / 22.5) % 16;
    return directions[index];
}
