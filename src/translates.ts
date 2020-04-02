const ru = {
  'by id': 'По умолчанию',
  'by age': 'По возрасту',
  'by name': 'По имени',
  'years old': 'лет',
  'Sort by': 'Сортировать по',
  Loading: 'Загрузка',
  'No results. Try to use other filters': 'Нет результатов. Попробуйте изменить фильтры',
};

const eng = {
  'by age': 'by age',
  'by id': 'by default',
  'by name': 'by name',
  'years old': 'years old',
  'Sort by': 'Sort by',
  Loading: 'Loading',
  'No results. Try to use other filters': 'No results. Try to use other filters',
};

const getTranslates = (lang: string) => {
  return lang === 'ru' ? ru : eng;
};

export default getTranslates;
