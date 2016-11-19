import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[cxTooltip]'
})
export class TooltipDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer) {}

  @Input() public cxTooltip: string = "";

  ngOnInit() {
  }
}
