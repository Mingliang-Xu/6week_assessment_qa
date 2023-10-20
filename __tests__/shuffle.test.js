const shuffle = require("../src/shuffle");


let testData =['a', 'b', 'c', 'd', 'e', 'f'];

describe("shuffle should...", () => {
  // CODE HERE
  test('items have been shuffled around and results contain the same items as the original array', () => {
    let shuffledArr = shuffle(testData);
    expect(shuffledArr[0]).not.toEqual(testData[0]) && expect(shuffledArr).toContain('a', 'b', 'c', 'd', 'e', 'f');
  });

  it('has the sameng length as the original array', () => {
    let shuffledArr = shuffle(testData);
    expect(shuffledArr).toHaveLength(testData.length)
  });

});
