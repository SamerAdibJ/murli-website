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
  fieldKey: string;
}

@Injectable({ providedIn: 'root' })
export class MurlisService {
  private http = inject(HttpClient);

  getToday(): Observable<MurliResponse> {
    const localDate = new Date().toLocaleDateString('en-CA'); // '2026-07-26' in local timezone
    return this.http
      .get<ApiResponse<MurliResponse>>(`${API.baseUrl}${API.murlis.today}?date=${localDate}`)
      .pipe(map((res) => res.data));
  }

  getByDate(date: string): Observable<MurliResponse> {
    return this.http
      .get<ApiResponse<MurliResponse>>(`${API.baseUrl}${API.murlis.byDate(date)}`)
      .pipe(map((res) => res.data));
  }

  buildSections(murli: MurliResponse, isRtl: boolean): MurliSectionData[] {
    const ek = (ar: string, en: string) => (isRtl ? ar : en);

    const morning: MurliSectionData[] = [
      {
        title: 'Essence',
        fieldKey: ek('essenceAr', 'essenceEn'),
        content: isRtl ? murli.essenceAr : murli.essenceEn,
      },
      {
        title: 'Question',
        fieldKey: ek('questionAr', 'questionEn'),
        content: isRtl ? murli.questionAr : murli.questionEn,
      },
      {
        title: 'Answer',
        fieldKey: ek('answerAr', 'answerEn'),
        content: isRtl ? murli.answerAr : murli.answerEn,
      },
      {
        title: 'Song',
        fieldKey: ek('songTitleAr', 'songTitleEn'),
        content: isRtl ? murli.songTitleAr : murli.songTitleEn,
      },
      {
        title: 'Murli',
        fieldKey: ek('mainContentAr', 'mainContentEn'),
        content: isRtl ? murli.mainContentAr : murli.mainContentEn,
      },
      {
        title: 'Essence for Dharna',
        fieldKey: ek('essenceForDharnaAr', 'essenceForDharnaEn'),
        content: isRtl ? murli.essenceForDharnaAr : murli.essenceForDharnaEn,
      },
      {
        title: 'Blessing',
        fieldKey: ek('blessingAr', 'blessingEn'),
        content: isRtl ? murli.blessingAr : murli.blessingEn,
      },
      {
        title: 'Slogan',
        fieldKey: ek('sloganAr', 'sloganEn'),
        content: isRtl ? murli.sloganAr : murli.sloganEn,
      },
      {
        title: 'Avyakt Signal',
        fieldKey: ek('avyaktSignalAr', 'avyaktSignalEn'),
        content: isRtl ? murli.avyaktSignalAr : murli.avyaktSignalEn,
      },
    ];

    const avyakt: MurliSectionData[] = [
      {
        title: '',
        fieldKey: ek('essenceForDharnaAr', 'essenceForDharnaEn'),
        content: isRtl ? murli.essenceForDharnaAr : murli.essenceForDharnaEn,
      },
      {
        title: 'Song',
        fieldKey: ek('songTitleAr', 'songTitleEn'),
        content: isRtl ? murli.songTitleAr : murli.songTitleEn,
      },
      {
        title: 'Murli',
        fieldKey: ek('mainContentAr', 'mainContentEn'),
        content: isRtl ? murli.mainContentAr : murli.mainContentEn,
      },
      {
        title: 'Blessing',
        fieldKey: ek('blessingAr', 'blessingEn'),
        content: isRtl ? murli.blessingAr : murli.blessingEn,
      },
      {
        title: 'Slogan',
        fieldKey: ek('sloganAr', 'sloganEn'),
        content: isRtl ? murli.sloganAr : murli.sloganEn,
      },
      {
        title: 'Avyakt Signal',
        fieldKey: ek('avyaktSignalAr', 'avyaktSignalEn'),
        content: isRtl ? murli.avyaktSignalAr : murli.avyaktSignalEn,
      },
    ];

    return murli.type === 'avyakt' ? avyakt : morning;
  }

  create(data: Partial<MurliResponse>): Observable<MurliResponse> {
    return this.http
      .post<ApiResponse<MurliResponse>>(`${API.baseUrl}${API.murlis.create}`, data)
      .pipe(map((res) => res.data));
  }

  update(id: number, data: Partial<MurliResponse>): Observable<MurliResponse> {
    return this.http
      .patch<ApiResponse<MurliResponse>>(`${API.baseUrl}${API.murlis.update(id)}`, data)
      .pipe(map((res) => res.data));
  }
}
