import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styles: ``
})
export class ButtonComponent {

  @Input() link: string = '';  
  @Input() class: string = '';

  @Output() handlePropertyChange = new EventEmitter<{ key: string; value: unknown }>();

  setContent = (key: string, value: unknown): void => {
    this.handlePropertyChange.emit({ key, value });
}
}