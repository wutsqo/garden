import * as migration_20260403_032748_add_homepage_global from './20260403_032748_add_homepage_global';
import * as migration_20260403_035740_add_employment_logos from './20260403_035740_add_employment_logos';

export const migrations = [
  {
    up: migration_20260403_032748_add_homepage_global.up,
    down: migration_20260403_032748_add_homepage_global.down,
    name: '20260403_032748_add_homepage_global',
  },
  {
    up: migration_20260403_035740_add_employment_logos.up,
    down: migration_20260403_035740_add_employment_logos.down,
    name: '20260403_035740_add_employment_logos'
  },
];
