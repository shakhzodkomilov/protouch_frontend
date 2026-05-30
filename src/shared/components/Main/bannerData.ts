import { NewsItemData } from "./NewsModal";

const bannerData: Record<string, NewsItemData[]> = {
  ru: [
    {
      title: "Гарантия",
      text: "Официальная гарантия на каждый продукт — покупайте с уверенностью.",
      icon: "/new-releases.svg",
    },
    {
      title: "Информация о продукте",
      text: "Узнайте больше об основных характеристиках и преимуществах продукта.",
      icon: "/information.svg",
    },
    {
      title: "Дополнительная помощь",
      text: "Мы всегда обеспечим ваш личный комфорт и надежную поддержку в каждом шаге.",
      icon: "/annotation-plus.svg",
    },
    {
      title: "Поддерживать",
      text: "Служба поддержки — создана для вашего удобства, уверенности и спокойствия.",
      icon: "/headphone.svg",
    },
  ],
  uz: [
    {
      title: "Kafolat",
      text: "Har bir mahsulot uchun rasmiy kafolat — ishonch bilan xarid qiling.",
      icon: "/new-releases.svg",
    },
    {
      title: "Mahsulot haqida ma'lumot",
      text: "Mahsulotning asosiy xususiyatlari va afzalliklari haqida koʻproq bilib oling.",
      icon: "/information.svg",
    },
    {
      title: "Qoʻshimcha yordam",
      text: "Biz har bir qadamda sizning shaxsiy qulayligingiz va ishonchli qoʻllab-quvvatlashni taʼminlaymiz.",
      icon: "/annotation-plus.svg",
    },
    {
      title: "Qoʻllab-quvvatlash",
      text: "Mijozlarni qoʻllab-quvvatlash xizmati — sizning qulayligingiz, ishonchingiz va xotirjamligingiz uchun yaratilgan.",
      icon: "/headphone.svg",
    },
  ],
};

export default bannerData;
