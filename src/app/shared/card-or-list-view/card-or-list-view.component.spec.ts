import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrListViewComponent } from './card-or-list-view.component';

describe('CardOrListViewComponent', () => {
  let component: CardOrListViewComponent;
  let fixture: ComponentFixture<CardOrListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
