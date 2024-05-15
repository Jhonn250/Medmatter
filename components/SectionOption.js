import { Box, HStack, Center, Text } from "native-base";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SectionOption = ({ backgroundColor, text, icon, nextScreen }) => {

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.navigate(nextScreen)}>
      <Box
        bg={backgroundColor}
        overflow="hidden"
        borderWidth="1"
        rounded="lg"
        borderColor="coolGray.50"
        shadow="0.5"
      >
        <HStack space={3} justifyContent="center">
          <Center width="86%" height="60px">
            <Box width="full">
              <Text fontSize="lg" style={{fontFamily:'RR'}}>{text}</Text>
            </Box>
          </Center>
          <Center>
            <Box>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name={icon} size={32} />
              </IconComponentProvider>
            </Box>
          </Center>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default SectionOption;
