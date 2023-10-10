interface Error {
  status: number;
  source: {
    pointer: string;
  };
  title: string;
  detail: { [key: string]: string[] };
}

export interface WaveError {
  errors: Error[];
}
