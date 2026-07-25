import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MurliResponse, ApiResponse } from 'shared';
import { API } from '../api/api.config';

export interface MurliSectionData {
  title: string;
  subtitle?: string;
  content: string | null;
}

@Injectable({ providedIn: 'root' })
export class MurlisService {
  private http = inject(HttpClient);

  getToday(): Observable<MurliResponse> {
    return this.http
      .get<ApiResponse<MurliResponse>>(`${API.baseUrl}${API.murlis.today}`)
      .pipe(map((res) => res.data));
  }

  buildSections(murli: MurliResponse, isRtl: boolean): MurliSectionData[] {
    const c = (ar: string | null, en: string | null) => (isRtl ? ar : en);

    const morning: MurliSectionData[] = [
      { title: 'Essence', content: c(murli.essenceAr, murli.essenceEn) },
      { title: 'Question', content: c(murli.questionAr, murli.questionEn) },
      { title: 'Answer', content: c(murli.answerAr, murli.answerEn) },
      { title: 'Song', subtitle: murli.songTitle ?? undefined, content: murli.songUrl },
      { title: 'Murli', content: c(murli.mainContentAr, murli.mainContentEn) },
      {
        title: 'Essence for Dharna',
        content: c(murli.essenceForDharnaAr, murli.essenceForDharnaEn),
      },
      { title: 'Blessing', content: c(murli.blessingAr, murli.blessingEn) },
      { title: 'Slogan', content: c(murli.sloganAr, murli.sloganEn) },
    ];

    const avyakt: MurliSectionData[] = [
      { title: '', content: c(murli.essenceForDharnaAr, murli.essenceForDharnaEn) },
      { title: 'Song', subtitle: murli.songTitle ?? undefined, content: murli.songUrl },
      { title: 'Murli', content: c(murli.mainContentAr, murli.mainContentEn) },
      { title: 'Blessing', content: c(murli.blessingAr, murli.blessingEn) },
      { title: 'Slogan', content: c(murli.sloganAr, murli.sloganEn) },
      { title: 'Avyakt Signal', content: c(murli.avyaktSignalAr, murli.avyaktSignalEn) },
    ];

    return murli.type === 'avyakt' ? avyakt : morning;
  }
}
