import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthEventsComponent } from './eth-events.component';

describe('EthEventsComponent', () => {
  let component: EthEventsComponent;
  let fixture: ComponentFixture<EthEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
