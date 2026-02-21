import Colors from "@/assets/colors/colors";
import {
  SectionList,
  SectionListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import WordComponent from "@/components/WordComponents/WordComponent";
import { ISectionListData, SectionItem } from "@/interfaces/sectionListInterface";
import { SafeAreaView } from "react-native-safe-area-context";

type ListOfWordsProps = {
  sectionL: ISectionListData;
};

export default function ListOfWords({ sectionL }: ListOfWordsProps) {
  const renderSectionItem: SectionListRenderItem<SectionItem> = ({ item }) => {
    return <WordComponent item={item} />;
  };
  return (
    <SafeAreaView style={localStyles.container} edges={['right', 'bottom', 'left']}>
      <SectionList
        sections={sectionL}
        renderItem={renderSectionItem}
        renderSectionHeader={({ section }) => (
          <Text style={localStyles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item.id}`}
        ListEmptyComponent={<Text>Empty</Text>}
      />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
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
