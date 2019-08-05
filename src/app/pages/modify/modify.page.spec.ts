import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPage } from './modify.page';

describe('ModifyPage', () => {
  let component: ModifyPage;
  let fixture: ComponentFixture<ModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
