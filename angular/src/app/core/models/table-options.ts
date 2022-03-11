import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export type TableOptions = PageEvent & Sort & { searchValue: string; };
