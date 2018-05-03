import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryDisplay'
})
export class CategoryDisplayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/_/g, " ");
  }

}
