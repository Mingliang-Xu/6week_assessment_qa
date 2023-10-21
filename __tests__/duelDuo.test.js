const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });
  it('can display 5 robots to choose from', async() => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id('draw')).click();
    let botChoices = await driver.wait(until.elementLocated(By.id('choices')),1000)
    let totalChoices = await botChoices.getAttribute('childElementCount')
    expect(totalChoices).toEqual('5');
    await driver.sleep(1000);
  });
  it('displays player duo after adding robots', async() => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id('draw')).click();
    await driver.sleep(1000);
    await driver.findElement(By.className('bot-btn')).click();
    await driver.sleep(1000);
    await driver.findElement(By.className('bot-btn')).click();
    let players= await driver.wait(until.elementLocated(By.id('player-duo')),1000)
    expect(await players.getAttribute('childElementCount')).toEqual('2');
  });

  test('players goes back to choices after being removed from duo', async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id('draw')).click();
    await driver.sleep(1000);
    await driver.findElement(By.className('bot-btn')).click();
    await driver.sleep(1000);
    await driver.findElement(By.className('bot-btn')).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[contains(text(),"Remove")]')).click();
    let botChoices = await driver.wait(until.elementLocated(By.id('choices')),1000)
    let totalChoices = await botChoices.getAttribute('childElementCount')
    expect(totalChoices).toEqual('4');
  });

});