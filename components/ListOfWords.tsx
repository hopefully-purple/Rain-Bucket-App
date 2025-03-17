import Colors from "@/assets/colors/colors";
import { IWord } from "@/interfaces/languageObjectInterface";
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import WordComponent from "@/components/WordComponent";
import { ISectionListData, SectionItem } from "@/interfaces/sectionListInterface";

type ListOfWordsProps = {
  sectionL: ISectionListData;
};

export default function ListOfWords({ sectionL }: ListOfWordsProps) {
  const renderSectionItem: SectionListRenderItem<SectionItem> = ({ item }) => {
    return <WordComponent item={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionL}
        renderItem={renderSectionItem}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item.id}`}
        ListEmptyComponent={<Text>Empty</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: Colors.main_theme.BACKGROUND_COLOR,
    color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
  },
});
