export interface SemesterProps {
  id: number;
  year: number;
  name: string;
}

export interface SemesterListProps {
  semesters: SemesterProps[];
  selectedSemesters: SemesterProps[];
  setSelectedSemesters: React.Dispatch<React.SetStateAction<SemesterProps[]>>;
}
