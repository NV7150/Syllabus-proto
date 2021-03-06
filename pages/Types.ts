import {Fields} from "~/components/Navigation/Constants";

export interface Subject{
  subject_name: string;
  term: string;
  url: string;
  field: string;
  place: string;
  is_giga: boolean;
  credit: number;
  staff: string[];
  method: string;
  lang: string;
  day: string;
  period: number;
}
