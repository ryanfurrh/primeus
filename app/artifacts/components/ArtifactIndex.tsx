export const ArtifactIndex: {
  name: string;
  file: string;
  scale: number;
  position?: number[];
  rotation?: number[];
  margin?: number;
  date?: string;
  use?: string;
  integrity?: number;
}[] = [
  {
    name: "Welcome",
    file: "models/personal_computer/scene2.gltf",
    scale: 2.5,
    rotation: [0.2, 0.2, 0.5],
    date: "2023/05/15",
    integrity: 6,
  },

  {
    name: "Visor",
    file: "models/visor/visor.gltf",
    scale: 0.6,
    position: [0, 0.3, 0],
    date: "2020/03/27",
    use: "Device which aides in harnassing the power of Flux energy. Worn by high ranking monks.",
    integrity: 4,
  },

  {
    name: "Flux Specimen 1",
    file: "models/flux-specimen-1/flux-specimen-1.gltf",
    scale: 0.5,
    position: [0, 0.3, 0],
    margin: 1,
    date: "2020/03/27",
    use: "The raw vital energy or life consciousness that exists in all things.",
    integrity: 2,
  },

  // {
  //   name: "Artifact B",
  //   file: "models/cell-amplifiers-3g/scene.gltf",
  //   scale: 2,
  //   date: "2023/05/15",
  //   use: "Civilia caelestium inclusa.  Turbinis locris docuere Dionysio molibus dependentes crinem.  Lapides vel molis.  Exspuitur ipsos ventus scandere longissima.",
  // },

  // {
  //   name: "Artifact C",
  //   file: "models/satellitedish/satellitedish.gltf",
  //   scale: 2.5,
  //   date: "2023/05/15",
  //   use: "Inclusa litus altitudinum subsolanus lumen stationes.  Invalida Porcio apsides admixtis.  Derasidas totus duas mutata.  Septentrio subiacet transgressis. ",
  // },
];
