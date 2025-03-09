import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const urlDatabase = new Map();

export const shortenURL = (longUrl: string) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortCode = "";
    for (let i = 0; i < 6; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const baseUrl = "https://mini-url/";
    const shortUrl = baseUrl + shortCode;
    
    urlDatabase.set(shortCode, longUrl);
    return shortUrl;
}

export const resolveURL = (shortCode: string) => {
    return urlDatabase.get(shortCode) || "URL not found";
}

// Exemple d'utilisation
const shortUrl = shortenURL("https://www.example.com/une-url-vraiment-tres-longue");
console.log("URL raccourcie :", shortUrl);

// Simuler la résolution
const shortCode = shortUrl.split("/").pop();
console.log("URL originale :", resolveURL(shortCode || ""));


