export interface Club {
  id: number;
  name: string;
}

export interface Representative {
  representativeEnum: number;
  club: Club;
}
