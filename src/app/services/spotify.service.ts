import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log("Spotify service listo");
  }

  getQuery( query: string ){
    
    const url = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDmDVDN6bOLIux07vvNU1BEyGT-D_nXlVe4wKz5ju3FpsItvxcI-CzBE7gijROFwIeKY2E6CqF6FCbIkPnFjfqyQvpiudWVD0V6RQANGGOUFJ9R5A5oMVnon63QrCfkOwbUE_AHFQ5I4k1W',
    });

    return this.http.get(url, { headers });

  }

  getNewReleases() {
    
    return this.getQuery('browse/new-releases')
            .pipe( map( data => data['albums'].items) );

    // return this.http.get('https://api.spotify.com/v1/', { headers })
    //         .pipe( map( (data: any) => {
    //           return data.albums.items;
    //         }));
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
        .pipe( map( (data: any) => data.artists.items));

  }

  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
        //.pipe( map( (data: any) => data.artists.items));

  }

  getTopTracks (id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
        .pipe( map( (data: any) => data.tracks));

  }
}
