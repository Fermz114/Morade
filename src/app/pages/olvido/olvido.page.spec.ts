import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidoPage } from './olvido.page';

describe('OlvidoPage', () => {
  let component: OlvidoPage;
  let fixture: ComponentFixture<OlvidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
