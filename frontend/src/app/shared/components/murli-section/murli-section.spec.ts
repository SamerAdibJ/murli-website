import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurliSection } from './murli-section';

describe('MurliSection', () => {
  let component: MurliSection;
  let fixture: ComponentFixture<MurliSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MurliSection],
    }).compileComponents();

    fixture = TestBed.createComponent(MurliSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
