interface Error {
  status: number;
  source: {
    pointer: string;
  };
  title: string;
  detail: string;
}

export interface WaveError {
  errors: Error[];
}
