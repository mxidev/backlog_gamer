import { ChangeDetectorRef, Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibraryGame, LibraryService } from '../library/library.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  readonly games = signal<LibraryGame[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal(false);
  readonly playingCount = computed(
    () => this.games().filter((game) => game.status === 'playing').length,
  );
  readonly completedCount = computed(
    () => this.games().filter((game) => game.status === 'completed').length,
  );

  constructor(
    private readonly libraryService: LibraryService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.libraryService.getUserLibrary().subscribe({
      next: (games) => {
        this.games.set(games);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }
}
