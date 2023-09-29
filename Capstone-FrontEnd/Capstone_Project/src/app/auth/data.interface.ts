export interface Data {
  accessToken: string;
  user: {
      id: number;
      nome: string;
      cognome: string;
      username: string;
      email: string;
      image: File;
  };
}
