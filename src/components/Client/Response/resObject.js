export function ResponseData(data) {
  return [
    {
      id: data.id,
      name: data.name,
      length: data.length,
      year: data.year,
      Rating: data.Rating,
      thumbnail: data.thumbnail,
    },
  ];
}
