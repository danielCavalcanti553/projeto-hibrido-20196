import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginCadastroPage } from './login-cadastro.page';

describe('LoginCadastroPage', () => {
  let component: LoginCadastroPage;
  let fixture: ComponentFixture<LoginCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCadastroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
