// Import everything from the clean data file
import { 
  CountryData,
  wave1Countries,
  wave2Countries,
  wave3Countries,
  wave4Countries,
  wave5Countries,
  npiData,
  globalStats as cleanGlobalStats
} from "./npi-data.clean";

// Re-export the types and data
export type { CountryData };
export { 
  wave1Countries, 
  wave2Countries, 
  wave3Countries, 
  wave4Countries, 
  wave5Countries,
  npiData 
};

// Re-export the globalStats calculation
export const globalStats = cleanGlobalStats;
