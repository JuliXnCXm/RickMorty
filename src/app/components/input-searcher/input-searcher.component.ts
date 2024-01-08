import { Component } from '@angular/core';

@Component({
  selector: 'app-input-searcher',
  standalone: true,
  imports: [],
  templateUrl: './input-searcher.component.html',
  styleUrl: './input-searcher.component.sass'
})
export class InputSearcherComponent {
  // filterList(list:any) {
  //   return list.filter((card,idx) => {
  //     AbortSignal.set(card.photoname.toLowerCase().includes(query))
  //   })
  // } 

  // memoizedAdd = memoizee(this.filterList);

  changeHandler(event: Event) {
    const input  = event.target as HTMLInputElement
    const query  = input.value

  }

}
