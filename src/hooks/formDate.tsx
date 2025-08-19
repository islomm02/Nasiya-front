export function   formatDate(isoString: string) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const monthNum = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const monthsShort = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun",
                       "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];

  const monthsFull = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
                      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

  return {
    fullFormatted: `${monthsShort[date.getMonth()]} ${parseInt(day)}, ${year} ${hours}:${minutes}`,
    dateOnly: `${day}.${monthNum}.${year}`,
    timeOnly: `${hours}:${minutes}`,
    monthFull: monthsFull[date.getMonth()],
    dayMonthShort: `${parseInt(day)} ${monthsShort[date.getMonth()]}`
  };
}
