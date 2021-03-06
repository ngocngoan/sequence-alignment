import {Component, Pipe, PipeTransform, Input} from 'angular2/core';
import {DIRECTIONS} from './directions.const';

@Pipe({ name: 'toArrayPipe' })
export class ToArrayPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        return _.toArray(value);
    }
}

@Component({
  selector: 'table-component',
  pipes: [ToArrayPipe],
  styles: [`
    .glyphicon-arrow-up.diagonal {
      transform: rotate(-45deg);
    }
  `],
  template: `
    <p *ngIf="finalT"> S': {{finalT}} </p>
    <p *ngIf="finalS"> T': {{finalS}} </p>
    <p *ngIf="score"> Score: {{score}} </p>

    <table class="table" *ngIf="matrix">
      <tr>
        <td> <td>
        <td *ngFor="#char of (sequenceT | toArrayPipe)"> {{char}} </td>
      <tr>
      <tr *ngFor="#row of (matrix | toArrayPipe); #i = index">
        <td *ngIf="i == 0"> </td>
        <td *ngIf="i > 0"> {{sequenceS[i-1]}} </td>
        <td *ngFor="#cell of row" [class.trace-cell]="cell.trace">
          <i class="glyphicon glyphicon-arrow-up" *ngIf="cell.direction == 'up'"> </i>
          <i class="glyphicon glyphicon-arrow-left" *ngIf="cell.direction == 'left'"> </i>
          <i class="glyphicon glyphicon-arrow-up diagonal" *ngIf="cell.direction == 'diag'"> </i>
          {{ cell.value }}
        </td>
      </tr>
    </table>
  `,
})
export class TableComponent {
  @Input() matrix;
  @Input() sequenceT;
  @Input() sequenceS;
  @Input() finalT;
  @Input() finalS;
  @Input() score;

  constructor() { }
}
