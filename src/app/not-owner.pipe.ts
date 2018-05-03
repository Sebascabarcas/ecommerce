import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notOwner'
})
export class NotOwnerPipe implements PipeTransform {

  transform(value: any, arg1: any): any {
      // return arg1
      return value.filter(product => product.user.id != arg1) 
    }
  

}
