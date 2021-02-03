module.export = {
  clearMocks: true, // при каждом запуске теста очищать моки
  collectoverageFrom: ['src/**/*.js'], // откуда собирать инфу для отчета по покрытию тестами (все файлы с расширением js)
  coverageDirectory: 'coverage', // где должен храниться отчет по покрытию - папка
  moduleFileExtensions: ['js'], // указываем расширение файлов, которые будем тестировать
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // указываем где могут находитьяс теста - файлы или папки
  testPathIgnorePatterns: ['\\\\node_modules\\\\'], // укаpsdftv где тесты не надо искать
  transformIgnorePatters: ['<rootDir>/node_modules/'], // указыает на то где нам не нужно файлы для трансформации
  transform: {
    '.+\\.(css|styl|less|sass|png|jpg|ttf|wof|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  }, // указыаем как работать с теми или иными файлами - для стилей - картнок и шрифтов - использовать пакет jest-transform-stub
  // verbose: false, // мы не хотим подробный отчет видеть
};
