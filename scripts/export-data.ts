import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import {
  wave1Countries,
  wave2Countries,
  wave3Countries,
  wave4Countries,
} from '../src/data/npi-data';

function toPlainCountry(c: any) {
  return {
    id: c.id,
    name: c.name,
    flag: c.flag,
    capital: c.capital,
    region: c.region,
    wave: c.wave,
    waveLabel: c.waveLabel,
    coordinates: c.coordinates,
    gdp: c.gdp,
    gdpPerCapita: c.gdpPerCapita,
    population: c.population,
    growthRate: c.growthRate,
    keySectors: c.keySectors,
    strategy: c.strategy,
    images: c.images,
    milestones: c.milestones,
  };
}

function buildWavesSeries(waves: Record<string, any[]>) {
  const result: Record<string, { label: string; years: number[]; series: number[] }> = {};
  Object.entries(waves).forEach(([key, arr]) => {
    // collect all years
    const yearsSet = new Set<number>();
    arr.forEach((c) => Object.keys(c.gdp || {}).forEach((y) => yearsSet.add(Number(y))));
    const years = Array.from(yearsSet).sort((a, b) => a - b);
    const series = years.map((y) => arr.reduce((sum, c) => sum + (c.gdp?.[String(y)] || 0), 0));
    const label = arr[0]?.waveLabel || key;
    result[key] = { label, years, series };
  });
  return result;
}

function main() {
  const outDir = join(__dirname, '..', 'public', 'data');
  mkdirSync(outDir, { recursive: true });

  const allCountries = [
    ...wave1Countries.map(toPlainCountry),
    ...wave2Countries.map(toPlainCountry),
    ...wave3Countries.map(toPlainCountry),
    ...wave4Countries.map(toPlainCountry),
  ];

  // Write npi-data.json (full dataset)
  const npiJsonPath = join(outDir, 'npi-data.json');
  writeFileSync(npiJsonPath, JSON.stringify({ countries: allCountries }, null, 2), 'utf-8');

  // Build waves.json from wave arrays
  const waves = buildWavesSeries({
    wave1: wave1Countries,
    wave2: wave2Countries,
    wave3: wave3Countries,
    wave4: wave4Countries,
  });
  const wavesPath = join(outDir, 'waves.json');
  writeFileSync(wavesPath, JSON.stringify(waves, null, 2), 'utf-8');

  // eslint-disable-next-line no-console
  console.log('Export completed:', { npiJsonPath, wavesPath });
}

main();
