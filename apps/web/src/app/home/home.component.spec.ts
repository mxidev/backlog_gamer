import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LibraryService } from '../library/library.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('shows the library totals returned by the service', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        {
          provide: LibraryService,
          useValue: {
            getUserLibrary: () =>
              of([
                { id: '1', status: 'playing' },
                { id: '2', status: 'completed' },
                { id: '3', status: 'pending' },
              ]),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const values = Array.from(element.querySelectorAll('.stat-value'));
    expect(values.map((value) => value.textContent?.trim())).toEqual(['3', '1', '1']);
  });
});
