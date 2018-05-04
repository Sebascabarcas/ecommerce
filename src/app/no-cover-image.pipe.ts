import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noCoverImage'
})
export class NoCoverImagePipe implements PipeTransform {

  transform(value: any, arg1: any): any {
    // return arg1
    if (arg1.cover) {
      return value.filter(picture => picture.picture.id != arg1.cover.id) 
    } else {
      return value
    }
  }

}
