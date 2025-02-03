import { IWord } from "@/interfaces/languageObjectInterface";
import { SectionListData } from "react-native";

// Stack overflow
//https://stackoverflow.com/questions/53691618/react-native-sectionlist-what-are-the-correct-typescript-types#:~:text=export%20type%20Item%20%3D%20string%3B%20//%20%3C%2D%2D%20Change%20me%0A%0Aexport%20type%20Section%20%3D%20%7B%0A%20%20title%3A%20string%3B%20%20//%20%3C%2D%2D%20Change%20me%0A%20%20data%3A%20readonly%20Item%5B%5D%3B%0A%7D

export type SectionItem = IWord;

export type ISection = {
  title: string;
  data: readonly SectionItem[];
}

export type ISectionListData = SectionListData<SectionItem, ISection>[];

// type ListProps = {
//   sections: SectionListData<Item, Section>[],
// }

// type RenderSectionHeaderArgs = {
//   section: SectionListData<Item, Section>
// }