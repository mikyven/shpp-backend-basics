const testData = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некомент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментарі :)`;

function csvParser(csv) {
  const parsedData = csv
    .split("\n")
    .filter((i) => i && !i.startsWith("#"))
    .map((i) => {
      const [x, y, name, population] = i.split(",");
      return { x, y, name, population };
    })
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .reduce(
      (a, c, index) => ({
        ...a,
        [c.name]: { population: c.population, rating: index + 1 },
      }),
      {}
    );

  return (text) =>
    text.replaceAll(
      new RegExp(
        Object.keys(parsedData).reduce(
          (a, c, i, arr) => a + `${i === arr.length - 1 ? c : c + "|"}`,
          ""
        ),
        "g"
      ),
      (match) => {
        if (!match) return;
        const cityData = parsedData[match];
        return `${match}: (${cityData.rating} місце в ТОП-10 найбільших міст України, населення ${cityData.population} чоловік)`;
      }
    );
}

console.log(csvParser(testData)("Алушта, Вінниця,\nБіла Церква"));
