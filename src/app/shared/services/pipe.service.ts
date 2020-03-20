import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PipeService {
  sortByDate(data) {
    data.sort((a, b) => {
        let b_dt = b.licenseEndDate.split(' ');
        let a_dt = a.licenseEndDate.split(' ');
        b_dt[0] = b_dt[0].split('-').reverse().join('-');
        b_dt = b_dt.join(' ');

        a_dt[0] = a_dt[0].split('-').reverse().join('-');
        a_dt = a_dt.join(' ');
        return new Date(b_dt).getTime() - new Date(a_dt).getTime();
    });
    return data;
  }
}
