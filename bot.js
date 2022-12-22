import { Markup, Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import getExchangeRates, { getWeather } from "./api.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_KEY);

bot.start((ctx) =>
  ctx.reply(
    `Welcome ${ctx.message.from.first_name}`,
    Markup.keyboard(["Курс валют", "Прогноз погоды"]).resize()
  )
);

bot.hears("Курс валют", async (ctx) => {
  try {
    ctx.reply("Ожидайте...");
    const data = await getExchangeRates();
    ctx.reply(`Покупка USD: ${data.usd_in}.
Продажа USD: ${data.usd_out}.
  `);
  } catch {
    ctx.reply("Что-то пошло не так, возможно отсутствует связь с банком.");
  }
});

bot.hears("Прогноз погоды", async (ctx) => {
  try {
    ctx.reply("Ожидайте...");
    const data = await getWeather();
    ctx.reply(`Город: ${data.city}.
Описание: ${data.description}.
Минимальная температура: ${data.temp_min}.
Максимальная температура: ${data.temp_max}.
    `);
  } catch {
    ctx.reply("Что-то пошло не так, возможно отсутствует связь с сервисом.");
  }
});

bot.launch();
