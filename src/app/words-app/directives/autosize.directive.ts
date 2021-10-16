import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})

export class Autosize {
  constructor(public element: ElementRef) {
  }

  @HostListener('input', ['$event.target'])

  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  ngAfterContentChecked(): void {
    this.adjust(true);
  }

  adjust(isPaste = false): void {
    const dropMoreOn = isPaste ? 0 : 30;

    const el = this.element.nativeElement;
    const scrollLeft = window.pageXOffset;
    const scrollTop = window.pageYOffset + dropMoreOn;

    el.style.overflow = 'hidden';
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + dropMoreOn + 'px';

    window.scrollTo(scrollLeft, scrollTop);
  }
}
