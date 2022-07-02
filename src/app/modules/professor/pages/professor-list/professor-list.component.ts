import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from 'src/app/commons/models/filtro.model';
import { Pagina } from 'src/app/commons/models/page.model';
import { ProfessorSimples } from '../../models/professor.model';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {

  paginaLista = {} as Pagina<ProfessorSimples>;

  contador = 0;
  filtroValue = "";
  filtroKey = "nome";
  filtroTamanhoPagina = 4;
  filtroPaginaDesejada = 0;

  teste = 5;

  constructor(private professorService: ProfessorService,
    private router: Router) {

     }

  ngOnInit(): void {
    
    this.resetarPagina();

  }

  listarControler(filter?: Filter) {
    this.professorService.listarService(filter)
      .then(result => {
        this.paginaLista = !!result ? result : {
          conteudo: [],
          paginaSelecionada: 0,
          proximaPagina: false,
          tamanhoPagina: 30
        };
        
        this.contador = this.paginaLista.conteudo.length;
      })

  }

  atualizarProfessor(professor: ProfessorSimples) {
    this.router.navigate([`professor/atualizar/${professor.id}`])
  }

  excluirProfessor(professor: ProfessorSimples) {
    this.professorService.excluirService(professor.id)
      .then(() => {
        this.resetarPagina();
      })
  }

  resetarPagina() {
    this.filtroPaginaDesejada = 0;
    
    this.paginaLista = {
      conteudo: [],
      paginaSelecionada: 0,
      proximaPagina: true,
      tamanhoPagina: 4
    } as Pagina<ProfessorSimples>;
    this.listarControler();
  }

  buscaComFiltro(avanca?: boolean) {

    let numPagina = 0;

    if (avanca) {
      numPagina = 1
    } else if (avanca == false) {
      if (this.filtroPaginaDesejada == 0) {
        alert('Pagina Indisponível')
      } else {
        numPagina = -1
      }
    }

    this.filtroPaginaDesejada = this.filtroPaginaDesejada + numPagina;
    
    const filtroController = {
      key: this.filtroKey,
      value: this.filtroValue,
      pageSize: this.filtroTamanhoPagina,
      wantedPage: this.filtroPaginaDesejada
    } as Filter

    this.paginaLista = {
      conteudo: [],
      paginaSelecionada: this.filtroPaginaDesejada,
      proximaPagina: false,
      tamanhoPagina: 4
    } as Pagina<ProfessorSimples>;

    this.listarControler(filtroController);
    
  }


}
