import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'styleSpace'
})
export class StyleSpacePipe implements PipeTransform {

  transform(value:string, currentIndex: number, maxIndex: number): string {
    let punctuation: string = value + ", ";
    if(currentIndex == maxIndex - 1) {
      punctuation = value + "";
    }

    return punctuation
  }

}
