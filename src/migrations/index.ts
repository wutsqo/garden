import * as migration_20260403_075126 from "./20260403_075126";
import * as migration_20260622_051328_move_homepage_content_to_payload from "./20260622_051328_move_homepage_content_to_payload";

export const migrations = [
  {
    up: migration_20260403_075126.up,
    down: migration_20260403_075126.down,
    name: "20260403_075126",
  },
  {
    up: migration_20260622_051328_move_homepage_content_to_payload.up,
    down: migration_20260622_051328_move_homepage_content_to_payload.down,
    name: "20260622_051328_move_homepage_content_to_payload",
  },
];
