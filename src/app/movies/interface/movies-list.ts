import { Dates } from "./dates";
import { Movie } from "./movie";


export interface MoviesList {
   dates: Dates;
   page: number;
   results: Movie[];
   total_pages: number;
   total_results: number;
}
