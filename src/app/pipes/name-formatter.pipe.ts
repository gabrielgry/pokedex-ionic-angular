import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFormatter',
  standalone: true,
})
export class NameFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    let formattedValue = value.replace(/-/g, ' ');
    return formattedValue.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
