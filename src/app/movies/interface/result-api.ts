import { Dates } from "./dates";
import { Movie } from "./movie";


export interface ResultApi {
   dates: Dates;
   page: number;
   results: Movie[];
   total_pages: number;
   total_results: number;
}
