import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";
import { Filme } from "../models/filme";

@Injectable({
    providedIn: 'root'
})
export class FilmeService{

    private API:string ='https://api.themoviedb.org/3/movie/'
    constructor(private http: HttpClient) {}

    public selecionarFilmesPopulares(paginaAlterada: number): Observable<Filme[]>{
       const url = this.API + 'popular' +'?page=${paginaAlterada}' +'&language=pt-BR';

        return this.http.get<any>(url, this.obeterHeadersAutorizacao())
        .pipe(
            map((res) => res.ressults),
            map(objetos => this.mapearFilmes(objetos))
        )

    }
    public selecionarFilmesBemAvaliados(paginaAlterada: number): Observable<Filme[]>{
        const url = this.API + 'top_rated'+ '?page=${paginaAlterada}' +'&language=pt-BR';
 
         return this.http.get<any>(url, this.obeterHeadersAutorizacao())
         .pipe(
             map((res) => res.ressults),
             map(objetos => this.mapearFilmes(objetos))
         )
 
     }

    private mapearFilmes(objetos: any[]):Filme[]{
        return objetos.map((obj: any):Filme =>{
            return new Filme (obj.id, obj.title, obj.poster_path)
        })
    }


    private obeterHeadersAutorizacao(){
       return{
        method:'get',
        headers:{
            accept:'aplication/json',
            Authorization: environment.API_KEY,
        }
      }
    }
        
    
} 
