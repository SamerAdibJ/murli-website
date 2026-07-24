import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DatePipe } from '@angular/common';
import { MurliSection } from '../../shared/components/murli-section/murli-section';
import { AppService } from '../../shared/services/app.service';
export interface TabItem {
  id: string;
  title: string;
  icon: string;
}
@Component({
  selector: 'app-today-murli',
  imports: [TabsModule, DatePipe, MurliSection],
  templateUrl: './today-murli.component.html',
  styleUrl: './today-murli.component.scss',
})
export class TodayMurliComponent {
  constructor(public appService: AppService) {}

  tabHeaders: TabItem[] = [
    { id: 'full', title: 'Full Murli', icon: 'pi pi-book text-2xl!' },
    { id: 'summary', title: 'Summary', icon: 'pi pi-list text-2xl!' },
    { id: 'song', title: 'Song', icon: 'pi pi-youtube text-2xl!' },
  ];

  today: Date = new Date();

  murliSections = [
    {
      title: 'Essence',
      content:
        'Sweet children, you have come to the Father to make your lives as valuable as a diamond. Only by having remembrance of the Father will your lives become like that.',
    },
    {
      title: 'Question',
      content:
        'What main effort do you need to make in order to claim a high status in the new world?',
    },
    {
      title: 'Answer',
      content:
        'Baba says: Sweet children, now remove your intellects from the trap of attachment to your old relations, who have made you so unhappy, and remember Me. While living with them, connect your mind to Me. Constantly remember the mantra: "Manmanabhav!" and you will claim a high status in the new world.',
    },
    {
      title: 'Song',
      content:
        'You spent the night in sleeping and the day in eating. Your life, that was as valuable as a diamond, has become as worthless as a shell.',
    },
    {
      title: 'Murli',
      content: `Om shanti. Just as the essence of the scriptures is explained to you children, similarly the essence of these songs is also explained to you. He alone is the spiritual Father of everyone. He sits here and explains to all of you spiritual children through the body of Brahma...

The Father explains that you have come to make your lives as valuable as diamonds. The confluence age is the benevolent age when the Father grants liberation and salvation. He reminds the children that only remembrance of the Father can transform them from impure souls into worthy-of-worship deities.

He explains the world cycle, the difference between devotion and knowledge, the inheritance of heaven, the story of the 84 births, and how Bharat once again becomes heaven. The Father repeatedly emphasizes that while living with your family, your intellect should remain connected to Him.

The meaning of "Manmanabhav" is to remember the Father and the land of Vishnu. Through remembrance, souls earn the greatest income and become conquerors of sin. God teaches this spiritual study so that His children can become kings of kings.

The Father asks the children to surrender their body, mind and wealth, live as trustees, remember Him constantly and claim their inheritance of the new world. Only through the power of yoga can souls become pure and attain the sovereignty of heaven.`,
    },
    {
      title: 'Essence for Dharna',
      content: `In order to claim a royal status, surrender yourself completely to the Father. Surrender your body, mind and wealth and live as a trustee. Make effort to become a conqueror of sin.

Only by having remembrance do you earn an income. Therefore, make effort to stay constantly in remembrance. Become such a spiritual flower that you claim a right to the world of flowers. No thorns should remain inside you.`,
    },
    {
      title: 'Blessing',
      content:
        'May you have unlimited disinterest and experience the whole world in the one Father. Only those who consider the Father to be their world can have unlimited disinterest. Both people and possessions are included in the world. By maintaining the awareness that the Father’s wealth is your wealth, you naturally become detached while remaining loving.',
    },
    {
      title: 'Slogan',
      content:
        'In order to experience a powerful stage, keep a balance of being in solitude and being entertaining.',
    },
    {
      title: 'Avyakt Signal',
      subtitle: 'Stay in the volcanic stage and experience powerful remembrance.',
      content:
        'Stay in the volcanic stage and experience powerful remembrance. Build a fortress of volcanic remembrance for yourself, your companions and all souls. When the volcano of remembrance is ignited, everyone experiences safety.',
    },
  ];
  avyaktSections = [
    {
      title: '',
      content:
        'Become a constantly charitable soul and you will continue to receive blessings for 21 births.',
    },
    {
      title: 'Murli',
      content: `Om shanti. The avyakt versions are the versions of the avaykt Father. Just as the Father spoke versions through Brahma Baba, He now speaks through this one. The Father is the same. The versions are the same. Some children think that the avyakt versions are separate. No. The versions of the avyakt are the versions of the same incorporeal Father.

The Father says: I enter this one and speak. I am the same Father. I am the Ocean of Knowledge. The versions of the avyakt are to be imbibed. You children have to become embodiments of remembrance. While sitting here, all of you have to become embodiments of remembrance.

The avyakt Father is teaching you children how to become embodiments of remembrance. Where there is remembrance, there is power. Where there is power, there is success. Where there is success, there is happiness. Where there is happiness, there is love. Where there is love, there is the Father. Where there is the Father, there is the inheritance.

The avyakt Father is making you children multi-millionaires. The wealth of remembrance is the greatest wealth. When you have remembrance, you have everything. When you forget the Father, you become poor. Therefore, the avyakt Father says: Constantly remember Me alone.`,
    },
    {
      title: 'Blessing',
      content:
        "May you be a constantly charitable soul and experience the Father's love in every breath. Those who are constantly charitable never experience any lack. The Father's treasures are unlimited. When you take something from the Father, you also have to give something. Give your mind and then take the Father's mind. Give your love and then take the Father's love. The more you give, the more you receive.",
    },
    {
      title: 'Slogan',
      content: 'In order to experience the avyakt stage, become a constantly charitable soul.',
    },
    {
      title: 'Avyakt Signal',
      subtitle: "Experience the Father's love in every breath.",
      content:
        "Stay in the avyakt stage and experience the Father's love in every breath. When you are in the avyakt stage, you are constantly in remembrance. The avyakt stage is the stage of being a constantly charitable soul. In this stage, you give and receive blessings continuously. Vyakt means visible. Avyakt means invisible. The avyakt Father is invisible, yet you can experience Him in every breath. When you become avyakt, you become free from the awareness of your body and are constantly in the awareness of the Father. This is the stage that all children have to attain.",
    },
  ];
}
