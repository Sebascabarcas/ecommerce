import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterJson'
})
export class FilterJsonPipe implements PipeTransform {

  transform(json: any, arg1: any, arg2: any): any {
    // return arg1
    return json.filter(product => product.price >= arg1 && product.price <= arg2) 
  }

}
