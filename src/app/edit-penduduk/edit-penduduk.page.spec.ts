import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPendudukPage } from './edit-penduduk.page';

describe('EditPendudukPage', () => {
  let component: EditPendudukPage;
  let fixture: ComponentFixture<EditPendudukPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPendudukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
