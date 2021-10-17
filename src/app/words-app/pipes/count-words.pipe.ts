import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countWords'
})
export class CountWordsPipe implements PipeTransform {

  transform(text: string): number {
    return text.trim().split(/[\s,.;]+/).length;
  }

}
