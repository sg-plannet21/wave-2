interface Error {
  status: number;
  source: {
    pointer: string;
  };
  title: string;
  detail: {
    detail: string;
    code: string;
  };
}

export interface WaveError {
  errors: Error[];
}
