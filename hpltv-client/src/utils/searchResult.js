export function searchResult(data, result, category, country, year, arrayData) {
  for (let item of data.data) {
    let isTitleMatch = false;
    let isCategoryMatch = false;
    let isCountryMatch = false;
    let isReleaseDateMatch = false;
    if (
      item?.title &&
      item?.title.toLowerCase().includes(result.toLowerCase())
    ) {
      isTitleMatch = true;
    }
    if (
      item?.listCategoryId &&
      item?.listCategoryId.some((cate) =>
        cate.toString().toLowerCase().includes(category.toLowerCase()),
      )
    ) {
      isCategoryMatch = true;
    }

    if (
      item?.country &&
      item?.country.some((coun) =>
        coun.toLowerCase().includes(country.toLowerCase()),
      )
    ) {
      isCountryMatch = true;
    }

    if (item?.releaseDate && item?.releaseDate.toString().includes(year)) {
      isReleaseDateMatch = true;
    }

    // Nếu tất cả các điều kiện đều thỏa mãn
    if (
      isTitleMatch &&
      isCategoryMatch &&
      isCountryMatch &&
      isReleaseDateMatch
    ) {
      arrayData.push(item);
    }
  }
}
