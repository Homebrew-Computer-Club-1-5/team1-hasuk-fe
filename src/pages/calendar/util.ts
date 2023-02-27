import { IannouncementData } from './MonthlyAnnouncementsWrapper';

export function sortAnnouncementDataByDate(
  announcementDatas: IannouncementData[],
): IannouncementData[] {
  const aaa = [...announcementDatas];
  return aaa.sort((a, b) => {
    const dateA = new Date(a.post_date);
    const dateB = new Date(b.post_date);
    return dateB.getTime() - dateA.getTime();
  });
}
