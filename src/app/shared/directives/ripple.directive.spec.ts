import { RippleDirective } from './ripple.directive';
import { ElementRef } from '@angular/core';

describe('RippleDirective', () => {
  it('should create an instance', () => {
    const directive = new RippleDirective(new ElementRef('check'));
    expect(directive).toBeTruthy();
  });
});
