import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserList2Component } from './user-list2.component';

describe('UserList2Component', () => {
  let component: UserList2Component;
  let fixture: ComponentFixture<UserList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserList2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
